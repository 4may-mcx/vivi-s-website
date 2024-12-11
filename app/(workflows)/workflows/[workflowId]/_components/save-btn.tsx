'use client';

import { UpdateWorkflow } from '@/actions/workflows/updateWorkflow';
import { Button } from '@/components/ui/button';
import { useMutation } from '@tanstack/react-query';
import { useReactFlow } from '@xyflow/react';
import { CheckIcon } from 'lucide-react';
import { toast } from 'sonner';

export const SaveBtn = ({ workflowId }: { workflowId: string }) => {
  const { toObject } = useReactFlow();

  const { mutate, isPending } = useMutation({
    mutationFn: UpdateWorkflow,
    onSuccess: () => {
      toast.success('Workflow saved', { id: 'save-workflow' });
    },
    onError: () => {
      toast.error('Failed to save workflow', { id: 'save-workflow' });
    },
  });

  const handleSave = () => {
    toast.loading('保存中...', { id: 'save-workflow' });
    mutate({
      id: workflowId,
      workflow: { definition: JSON.stringify(toObject()) },
    });
  };

  return (
    <Button
      variant="outline"
      className="flex items-center gap-2"
      onClick={handleSave}
      disabled={isPending}
    >
      <CheckIcon size={16} className="stroke-green-800" />
      Save
    </Button>
  );
};
