'use client';

import { Workflow } from '@prisma/client';
import {
  addEdge,
  Background,
  BackgroundVariant,
  Connection,
  Controls,
  Edge,
  MiniMap,
  ReactFlow,
  useEdgesState,
  useNodesState,
  useReactFlow,
  getOutgoers,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useCallback, useEffect } from 'react';
import { NodeComponent } from './nodes/node-component';
import { createFlowNode } from '../_lib/createFlowNode';
import { AppNode, TaskType } from '../data';
import { DeletableEdge } from './edges/deletableEdge';
import { TaskRegistry } from '../_lib/task/registry';

const nodeTypes = {
  FlowScrapeNode: NodeComponent,
};

const edgeTypes = {
  default: DeletableEdge,
};

const snapGrid: [number, number] = [12, 12];
const fitViewOptions = { padding: 2 };

export const FlowEditor = ({ workflow }: { workflow: Workflow | null }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState<AppNode>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const { setViewport, screenToFlowPosition, updateNodeData } = useReactFlow();

  useEffect(() => {
    try {
      if (!workflow) return;
      const flow = JSON.parse(workflow.definition);
      console.log('@INIT_FLOW ', flow);

      if (!flow) return;
      setNodes(flow.nodes ?? []);
      setEdges(flow.edges ?? []);

      if (!flow.viewport) return;
      setViewport({ x: flow.viewport.x, y: flow.viewport.y, zoom: 1 });
    } catch (error) {}
  }, [workflow]);

  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges((eds) => addEdge({ ...connection, animated: true }, eds));
      console.log('@NEW_CONNECT ', connection);

      if (!connection.targetHandle) return;

      const node = nodes.find((node) => node.id === connection.target);
      if (!node) return;

      const nodeInputs = node.data.inputs;
      updateNodeData(node.id, {
        inputs: {
          ...nodeInputs,
          [connection.targetHandle]: '',
        },
      });
    },
    [setEdges, nodes, updateNodeData],
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    // 如果和 DragStart 的 effectAllowed 不匹配，不会执行后续的 onDrop
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      const taskType = event.dataTransfer.getData('application/reactflow');
      if (!taskType) return;

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode = createFlowNode(taskType as TaskType, position);
      setNodes((nds) => nds.concat(newNode));
    },
    [setNodes, screenToFlowPosition],
  );

  const isValidConnection = useCallback(
    (connection: Edge | Connection) => {
      if (connection.source === connection.target) return false;

      const source = nodes.find((node) => node.id === connection.source);
      const target = nodes.find((node) => node.id === connection.target);
      if (!source || !target) {
        console.log('invalid connection: source or target not found');
        return false;
      }

      const sourceTask = TaskRegistry[source.data.type];
      const targetTask = TaskRegistry[target.data.type];

      const output = sourceTask.outputs?.find(
        (output) => output.name === connection.targetHandle,
      );

      const input = targetTask.inputs?.find(
        (input) => input.name === connection.targetHandle,
      );

      if (input?.type !== output?.type) {
        console.log('invalid connection: input type not match output type');
        return false;
      }

      const hasCycle = (node: AppNode, visited = new Set()) => {
        if (visited.has(node.id)) return false;

        visited.add(node.id);

        for (const outgoer of getOutgoers(node, nodes, edges)) {
          if (outgoer.id === connection.source) return true;
          if (hasCycle(outgoer, visited)) return true;
        }
      };

      return !hasCycle(target);
    },
    [nodes, edges],
  );

  return (
    <main style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDragOver={onDragOver}
        onDrop={onDrop}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        snapToGrid
        snapGrid={snapGrid}
        fitView
        fitViewOptions={fitViewOptions}
        isValidConnection={isValidConnection}
      >
        <Controls position="top-left" fitViewOptions={fitViewOptions} />
        <MiniMap />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </main>
  );
};
