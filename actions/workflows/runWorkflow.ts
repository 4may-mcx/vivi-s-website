'use server';

import { flowToExecutionPlan } from '@/app/(workflows)/workflows/[workflowId]/_lib/executionPlan';
import { TaskRegistry } from '@/app/(workflows)/workflows/[workflowId]/_lib/task/registry';
import prisma from '@/lib/prisma';
import {
  WorkflowExecutionPhaseStatus,
  WorkflowExecutionPlan,
  WorkflowExecutionStatus,
  WorkflowExecutionTrigger,
} from '@/types/workflow';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export const RunWorkflow = async ({
  workflowId,
  flowDefinition,
}: {
  workflowId: string;
  flowDefinition: string;
}) => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error('unAuthenticated');
  }

  const workflow = await prisma.workflow.findUnique({
    where: {
      id: workflowId,
      userId,
    },
  });

  if (!workflow) {
    throw new Error('Workflow not found');
  }

  const flow = JSON.parse(flowDefinition);
  const executionPlanVO = flowToExecutionPlan(flow.nodes, flow.edges);

  if (executionPlanVO.errors) {
    throw new Error('flow definition is invalid');
  }
  if (!executionPlanVO.executionPlan) {
    throw new Error('no execution plan generated');
  }

  const execution = await prisma.workflowExecution.create({
    data: {
      workflowId,
      userId,
      startedTime: new Date(),
      status: WorkflowExecutionStatus.PENDING,
      trigger: WorkflowExecutionTrigger.MANUAL,
      phases: {
        create: executionPlanVO.executionPlan.flatMap((executionPhase) =>
          executionPhase.nodes.map((node) => ({
            userId,
            status: WorkflowExecutionPhaseStatus.CREATED,
            number: executionPhase.phase,
            node: JSON.stringify(node),
            name: TaskRegistry[node.data.type].label,
          })),
        ),
      },
    },
    select: {
      id: true,
    },
  });

  if (!execution) {
    throw new Error('Failed to create workflow execution');
  }

  return redirect(`/workflows/${workflowId}/runs/${execution.id}`);
};
