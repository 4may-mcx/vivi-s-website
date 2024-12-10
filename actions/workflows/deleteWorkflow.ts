'use server';

import prisma from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';

export const DeleteWorkflow = async (workflowId: string) => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error('unAuthenticated');
  }

  const result = await prisma.workflow.delete({
    where: {
      id: workflowId,
      userId,
    },
  });

  if (!result) {
    throw new Error('failed to delete workflow');
  }

  return result;
};
