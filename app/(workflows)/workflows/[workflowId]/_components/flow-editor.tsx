'use client';

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
} from '@xyflow/react';
import { useCallback } from 'react';

import { Workflow } from '@prisma/client';
import '@xyflow/react/dist/style.css';
import { createFlowNode } from '../_lib/createFlowNode';
import { TaskType } from '../data';
import { NodeComponent } from './nodes/node-component';

const initialEdges: Edge[] = [{ id: 'e1-2', source: '1', target: '2' }];

const nodeTypes = {
  FlowScrapeNode: NodeComponent,
};

const snapGrid: [number, number] = [12, 12];
const fitViewOptions = { padding: 2 };

export const FlowEditor = ({ workflow }: { workflow: Workflow | null }) => {
  console.log(workflow, '======');

  const [nodes, setNodes, onNodesChange] = useNodesState([
    createFlowNode(TaskType.VARIABLE_GROUP),
  ]);

  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  return (
    <main style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        snapToGrid
        snapGrid={snapGrid}
        fitView
        fitViewOptions={fitViewOptions}
      >
        <Controls position="top-left" fitViewOptions={fitViewOptions} />
        <MiniMap />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </main>
  );
};
