'use server';

import prisma from '@/lib/prisma';
import { WorkflowStatus } from '@/types/workflow';
import { auth } from '@clerk/nextjs/server';
import { Workflow } from '@prisma/client';

export const UpdateWorkflow = async ({
  id,
  workflow,
}: {
  id: string;
  workflow: Partial<Workflow>;
}) => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error('unAuthenticated');
  }

  const result = await prisma.workflow.findUnique({
    where: { id, userId },
  });

  if (!result) {
    throw new Error('Workflow not found');
  }
  if (result.status !== WorkflowStatus.DRAFT) {
    throw new Error('Workflow is not in draft status');
  }

  const updatedWorkflow = await prisma.workflow.update({
    where: { id, userId },
    data: {
      ...workflow,
      userId,
    },
  });

  return updatedWorkflow;
};
