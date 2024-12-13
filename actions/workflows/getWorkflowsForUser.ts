'use server';

import prisma from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';

export const GetWorkflowsForUser = async () => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error('Unauthorized');
  }

  return prisma.workflow.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdTime: 'asc',
    },
  });
};

export const GetWorkFlowById = async (workflowId: string) => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error('unAuthenticated');
  }
  return prisma.workflow.findUnique({
    where: { id: workflowId, userId },
  });
};
