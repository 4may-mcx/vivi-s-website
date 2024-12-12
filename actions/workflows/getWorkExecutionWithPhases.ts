'use server';

import prisma from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';

export const GetWorkExecutionWithPhases = async (executionId: string) => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error('unAuthenticated');
  }

  const execution = await prisma.workflowExecution.findUnique({
    where: { id: executionId, userId },
    include: {
      phases: {
        orderBy: {
          number: 'asc',
        },
      },
    },
  });

  return execution;
};
