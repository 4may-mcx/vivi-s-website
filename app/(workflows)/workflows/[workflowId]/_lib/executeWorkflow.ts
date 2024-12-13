import 'server-only';

import { createLogCollector } from '@/lib/log';
import prisma from '@/lib/prisma';
import {
  AppNode,
  LogCollector,
  TaskParamType,
  WorkflowExecutionPhaseStatus,
  WorkflowExecutionStatus,
  WorkflowGlobalEnvironment,
  WorkflowTask,
  WorkflowTaskEnvironment,
} from '@/types/workflow';
import { Prisma, WorkflowExecutionPhase } from '@prisma/client';
import { Edge } from '@xyflow/react';
import { revalidatePath } from 'next/cache';
import { Browser, Page } from 'puppeteer';
import { ExecutorRegistry } from './executor/registry';
import { TaskRegistry } from './task/registry';

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

const createExecutionEnvironment = <T extends WorkflowTask>(
  node: AppNode,
  globalEnvironment: WorkflowGlobalEnvironment,
  logCollector: LogCollector,
): WorkflowTaskEnvironment<T> => {
  return {
    getInput: (name: string) => globalEnvironment.phases[node.id]?.inputs[name],
    setOutput: (name: string, value: string) => {
      globalEnvironment.phases[node.id].outputs[name] = value;
    },

    // 公共参数
    getBrowser: () => globalEnvironment?.browser,
    setBrowser: (browser: Browser) => {
      globalEnvironment.browser = browser;
    },

    getPage: () => globalEnvironment?.page,
    setPage: (page: Page) => {
      globalEnvironment.page = page;
    },

    log: logCollector,
  };
};

const cleanupExecutionEnvironment = async (
  environment: WorkflowGlobalEnvironment,
) => {
  if (environment.browser) {
    await environment.browser.close().catch((error) => {
      console.error('@BROWSER_CLOSE_ERROR: ', error);
    });
  }
};

const executePhase = async (
  phase: WorkflowExecutionPhase,
  node: AppNode,
  environment: WorkflowGlobalEnvironment,
  logCollector: LogCollector,
) => {
  const executor = ExecutorRegistry[node.data.type];
  if (!executor) {
    return false;
  }

  const executionEnvironment = createExecutionEnvironment(
    node,
    environment,
    logCollector,
  );

  return await executor(executionEnvironment);
};

const setupEnvironmentForPhase = (
  node: AppNode,
  environment: WorkflowGlobalEnvironment,
  edges: Edge[],
) => {
  environment.phases[node.id] = {
    inputs: {},
    outputs: {},
  };

  const inputs = TaskRegistry[node.data.type].inputs;
  for (const input of inputs) {
    // 配置在全局环境
    if (input.type === TaskParamType.BROWSER_INSTANCE) {
      continue;
    }

    const inputValue = node.data.inputs[input.name];
    if (inputValue) {
      environment.phases[node.id].inputs[input.name] = inputValue;
      continue;
    }

    // 从上一个节点的output获取参数
    const connectedEdge = edges.find(
      (edge) => edge.target === node.id && edge.targetHandle === input.name,
    );

    if (!connectedEdge) {
      console.error(
        '@CONNECTED_EDGE_NOT_FOUND: ',
        input.name,
        'NODE_ID: ',
        node.id,
      );
      continue;
    }

    const outputValue =
      environment.phases[connectedEdge.source].outputs[
        connectedEdge.sourceHandle!
      ];
    if (!outputValue) {
      console.error(
        '@OUTPUT_VALUE_NOT_FOUND: ',
        input.name,
        'NODE_ID: ',
        node.id,
      );
      continue;
    }

    environment.phases[node.id].inputs[input.name] = outputValue;
  }
};

const executeWorkflowPhase = async (
  phase: WorkflowExecutionPhase,
  environment: WorkflowGlobalEnvironment,
  edges: Edge[],
) => {
  const logCollector = createLogCollector();

  const startedTime = new Date();
  const node = JSON.parse(phase.node) as AppNode;

  setupEnvironmentForPhase(node, environment, edges);

  await prisma.workflowExecutionPhase.update({
    where: { id: phase.id },
    data: {
      status: WorkflowExecutionPhaseStatus.RUNNING,
      startedTime,
      inputs: JSON.stringify(environment.phases[node.id].inputs),
    },
  });

  const success = await executePhase(phase, node, environment, logCollector);

  const completedTime = new Date();
  await prisma.workflowExecutionPhase.update({
    where: { id: phase.id },
    data: {
      status: success
        ? WorkflowExecutionPhaseStatus.COMPLETED
        : WorkflowExecutionPhaseStatus.FAILED,
      completedTime,
      outputs: JSON.stringify(environment.phases[node.id].outputs),
      logs: {
        createMany: {
          data: logCollector.getAll().map((log) => ({
            logLevel: log.level,
            message: log.message,
            timestamp: log.timestamp,
          })),
        },
      },
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

  const environment: WorkflowGlobalEnvironment = { phases: {} };
  const edges = JSON.parse(execution.definition).edges as Edge[];

  await initializeWorkflowExecution(executionId, execution.workflowId);
  await initializePhaseStatus(execution);

  let executionFailed = false;

  for (const phase of execution.phases) {
    // 每个阶段创建一个新的，互相隔离
    const phaseExecution = await executeWorkflowPhase(
      phase,
      environment,
      edges,
    );
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

  await cleanupExecutionEnvironment(environment);

  revalidatePath('/workflows/*');
};
