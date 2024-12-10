'use client';

import { DeleteWorkflow } from '@/actions/workflows/deleteWorkflow';
import { Button } from '@/components/ui/button';
import { useMutation } from '@tanstack/react-query';
import { TrashIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export const DeleteWorkflowBtn = ({ workflowId }: { workflowId: string }) => {
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: DeleteWorkflow,
    onSuccess: () => {
      router.refresh();
      toast.success('删除成功', { id: 'delete-workflow' });
    },
    onError: () => {
      toast.error('删除失败', { id: 'delete-workflow' });
    },
  });

  const handleClick = () => {
    toast.loading('删除中...', { id: 'delete-workflow' });
    mutate(workflowId);
  };

  return (
    <Button
      variant="ghost"
      disabled={isPending}
      onClick={handleClick}
      className="flex w-full justify-start p-0"
    >
      <TrashIcon size={16} />
      删除
    </Button>
  );
};
