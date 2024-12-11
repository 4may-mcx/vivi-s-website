import {
  AppNode,
  WorkflowExecutionPlan,
  WorkflowExecutionPlanPhase,
} from '@/types/workflow';
import { Edge } from '@xyflow/react';
import { TaskRegistry } from './task/registry';

const getEntryPoint = (nodes: AppNode[]) => {
  const entryPoint = nodes.find(
    (node) => TaskRegistry[node.data.type].isEntryPoint,
  );

  if (!entryPoint) {
    throw new Error('todo: handle this error');
  }

  return entryPoint;
};

export const flowToExecutionPlan = (
  nodes: AppNode[],
  edges: Edge[],
): {
  executionPlan?: WorkflowExecutionPlan;
} => {
  const planned = new Set<string>();
  const executionPlan: WorkflowExecutionPlan = [
    {
      phase: 1,
      nodes: [getEntryPoint(nodes)],
    },
  ];

  for (
    let phase = 2;
    phase <= nodes.length || planned.size < nodes.length;
    phase++
  ) {
    const nextPhase: WorkflowExecutionPlanPhase = { phase, nodes: [] };
    console.log(nextPhase, '==');
  }

  return {
    executionPlan,
  };
};
