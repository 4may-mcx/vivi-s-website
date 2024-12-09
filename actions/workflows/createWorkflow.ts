'use server';

import prisma from '@/lib/prisma';
import {
  createWorkflowSchema,
  CreateWorkflowSchemaType,
} from '@/schema/workflow';
import { WorkflowStatus } from '@/types/workflow';
import { auth } from '@clerk/nextjs/server';

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
      definition: 'todo',
      ...data,
    },
  });

  if (!result) {
    throw new Error('failed to create workflow');
  }

  return result;
};
