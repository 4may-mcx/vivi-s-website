'use server';

import { createFlowNode } from '@/app/(workflows)/workflows/[workflowId]/_lib/createFlowNode';
import prisma from '@/lib/prisma';
import {
  createWorkflowSchema,
  CreateWorkflowSchemaType,
} from '@/schema/workflow';
import { AppNode, TaskType } from '@/types/workflow';
import { WorkflowStatus } from '@/types/workflow/workflow';
import { auth } from '@clerk/nextjs/server';
import { Edge } from '@xyflow/react';
import { redirect } from 'next/navigation';

const getInitialFlow = () => {
  const initialFlow: { nodes: AppNode[]; edges: Edge[] } = {
    nodes: [],
    edges: [],
  };
  initialFlow.nodes.push(createFlowNode(TaskType.VARIABLE_GROUP));
  return initialFlow;
};

export const CreateWorkflow = async (form: CreateWorkflowSchemaType) => {
  const { success, data } = createWorkflowSchema.safeParse(form);
  if (!success) {
    throw new Error('invalid form data');
  }

  const { userId } = await auth();

  if (!userId) {
    throw new Error('Unauthorized');
  }

  const result = await prisma.workflow.create({
    data: {
      userId,
      status: WorkflowStatus.DRAFT,
      definition: JSON.stringify(getInitialFlow()),
      ...data,
    },
    select: {
      id: true,
    },
  });

  if (!result) {
    throw new Error('failed to create workflow');
  }

  return redirect(`/workflows/${result.id}`);
};
