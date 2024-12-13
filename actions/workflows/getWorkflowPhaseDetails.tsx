'use server';

import prisma from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';

export const GetWorkflowPhaseDetails = async (phaseId: string) => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error('Unauthorized');
  }

  return prisma.workflowExecutionPhase.findUnique({
    where: {
      id: phaseId,
      workflowExecution: {
        userId,
      },
    },
    include: {
      logs: {
        orderBy: {
          timestamp: 'asc',
        },
      },
    },
  });
};