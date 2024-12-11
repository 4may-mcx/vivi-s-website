'use server';

import { createFlowNode } from '@/app/(workflows)/workflows/[workflowId]/_lib/createFlowNode';
import {
  AppNode,
  TaskType,
} from '@/app/(workflows)/workflows/[workflowId]/data';
import prisma from '@/lib/prisma';
import {
  createWorkflowSchema,
  CreateWorkflowSchemaType,
} from '@/schema/workflow';
import { WorkflowStatus } from '@/types/workflow';
import { auth } from '@clerk/nextjs/server';
import { Edge } from '@xyflow/react';

const getInitialFlow = () => {
  const initialFlow: { nodes: AppNode[]; edges: Edge[] } = {
    nodes: [],
    edges: [],
  };
  initialFlow.nodes.push(createFlowNode(TaskType.LAUNCH_BROWSER));
  return initialFlow;
};

export const CreateWorkflow = async (form: CreateWorkflowSchemaType) => {
  const { success, data } = createWorkflowSchema.safeParse(form);
  if (!success) {
    throw new Error('invalid form data');
  }

  const { userId } = await auth();

  if (!userId) {
    throw new Error('unAuthenticated');
  }

  const result = await prisma.workflow.create({
    data: {
      userId,
      status: WorkflowStatus.DRAFT,
      definition: JSON.stringify(getInitialFlow()),
      ...data,
    },
  });

  if (!result) {
    throw new Error('failed to create workflow');
  }

  return result;
};
