'use client';

import { CreateWorkflow } from '@/actions/workflows/createWorkflow';
import { CustomDialogHeader } from '@/components/custom-dialog-header';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  createWorkflowSchema,
  CreateWorkflowSchemaType,
} from '@/schema/workflow';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Layers2Icon, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export const CreateWorkflowDialog = ({
  triggerText,
}: {
  triggerText?: string;
}) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const form = useForm<CreateWorkflowSchemaType>({
    resolver: zodResolver(createWorkflowSchema),
    defaultValues: {},
  });

  const { mutate, isPending } = useMutation({
    mutationFn: CreateWorkflow,
    onSuccess: () => {
      toast.success('创建成功', { id: 'create-workflow' });
      setOpen(false);
      router.refresh();
    },
    onError: () => {
      toast.error('创建失败', { id: 'create-workflow' });
    },
  });

  const handleSubmit = useCallback(
    (values: CreateWorkflowSchemaType) => {
      toast.loading('创建中...', { id: 'create-workflow' });
      mutate(values);
    },
    [mutate],
  );

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        form.reset();
        setOpen(isOpen);
      }}
    >
      <DialogTrigger asChild>
        <Button>{triggerText ?? '新建 Workflow'}</Button>
      </DialogTrigger>
      <DialogContent className="px-0">
        <CustomDialogHeader
          icon={Layers2Icon}
          title="创建 Workflow"
          subTitle="开始构建你的 Workflow 吧"
        />
        <div className="p-6">
          <Form {...form}>
            <form
              className="w-full space-y-8"
              onSubmit={form.handleSubmit(handleSubmit)}
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-1">
                      名称
                      <p className="text-xs text-green-700">(必填)</p>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-1">
                      描述
                    </FormLabel>
                    <FormControl>
                      <Textarea className="resize-none" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? <Loader2 className="animate-spin" /> : '确认'}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
