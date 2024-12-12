import { waitFor } from '@/lib/helper';
import prisma from '@/lib/prisma';
import {
  AppNode,
  WorkflowExecutionPhaseStatus,
  WorkflowExecutionStatus,
} from '@/types/workflow';
import {
  Prisma,
  WorkflowExecution,
  WorkflowExecutionPhase,
} from '@prisma/client';
import { revalidatePath } from 'next/cache';
import 'server-only';
import { TaskRegistry } from './task/registry';
import { ExecutorRegistry } from './executor/registry';

const initializeWorkflowExecution = async (
  executionId: string,
  workflowId: string,
) => {
  await prisma.workflowExecution.update({
    where: {
      id: executionId,
    },
    data: {
      startedTime: new Date(),
      status: WorkflowExecutionStatus.RUNNING,
    },
  });

  await prisma.workflow.update({
    where: {
      id: workflowId,
    },
    data: {
      lastRunAt: new Date(),
      lastRunId: executionId,
      lastRunStatus: WorkflowExecutionStatus.RUNNING,
    },
  });
};

type ExecutionWithPhases = Prisma.WorkflowExecutionGetPayload<{
  include: { phases: true };
}>;

const initializePhaseStatus = async (execution: ExecutionWithPhases) => {
  await prisma.workflowExecutionPhase.updateMany({
    where: {
      id: {
        in: execution.phases.map((phase) => phase.id),
      },
    },
    data: {
      status: WorkflowExecutionPhaseStatus.PENDING,
    },
  });
};

const finalizeWorkflowExecution = async (
  executionId: string,
  workflowId: string,
  executionFailed: boolean,
) => {
  const finalStatus = executionFailed
    ? WorkflowExecutionStatus.FAILED
    : WorkflowExecutionStatus.COMPLETED;

  await prisma.workflowExecution.update({
    where: { id: executionId },
    data: { status: finalStatus, completedTime: new Date() },
  });

  await prisma.workflow
    .update({
      where: { id: workflowId, lastRunId: executionId },
      data: { lastRunStatus: finalStatus },
    })
    .catch(() => {
      // ignore error
    });
};

const executePhase = async (phase: WorkflowExecutionPhase, node: AppNode) => {
  const executor = ExecutorRegistry[node.data.type];
  if (!executor) {
    return false;
  }

  return await executor();
};

const executeWorkflowPhase = async (phase: WorkflowExecutionPhase) => {
  const startedTime = new Date();
  const node = JSON.parse(phase.node) as AppNode;

  await prisma.workflowExecutionPhase.update({
    where: { id: phase.id },
    data: { status: WorkflowExecutionPhaseStatus.RUNNING, startedTime },
  });

  const success = await executePhase(phase, node);

  const completedTime = new Date();
  await prisma.workflowExecutionPhase.update({
    where: { id: phase.id },
    data: {
      status: success
        ? WorkflowExecutionPhaseStatus.COMPLETED
        : WorkflowExecutionPhaseStatus.FAILED,
      completedTime,
    },
  });

  return {
    success,
  };
};

export const executeWorkflow = async (executionId: string) => {
  const execution = await prisma.workflowExecution.findUnique({
    where: {
      id: executionId,
    },
    include: {
      workflow: true,
      phases: true,
    },
  });

  if (!execution) {
    throw new Error('Execution not found');
  }

  const environment = { phases: {} };

  await initializeWorkflowExecution(executionId, execution.workflowId);
  await initializePhaseStatus(execution);

  let executionFailed = false;

  for (const phase of execution.phases) {
    const phaseExecution = await executeWorkflowPhase(phase);
    if (!phaseExecution.success) {
      executionFailed = true;
      break;
    }
  }
  await finalizeWorkflowExecution(
    executionId,
    execution.workflowId,
    executionFailed,
  );

  revalidatePath('/workflows/*');
};
