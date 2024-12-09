import { GetWorkflowsForUser } from '@/actions/workflows/getWorkflowsForUser';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle, InboxIcon } from 'lucide-react';
import { Suspense } from 'react';
import { CreateWorkflowDialog } from './_components/create-workflow-dialog';

const UserWorkflowsSkeleton = () => {
  return (
    <div className="space-y-2">
      {[1, 2, 3, 4].map((i) => (
        <Skeleton key={i} className="h-32 w-full" />
      ))}
    </div>
  );
};

const UserWorkflows = async () => {
  try {
    const workflows = await GetWorkflowsForUser();

    if (workflows.length === 0) {
      return (
        <div className="flex h-full flex-col items-center justify-center gap-4">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-accent">
            <InboxIcon size={40} className="stroke-primary" />
          </div>
          <div className="flex flex-col gap-1 text-center">
            <p className="font-bold">暂时没有任何Workflows哦~</p>
            <p className="text-sm text-muted-foreground">
              点击下方按钮开始创建第一个Workflow吧
            </p>
          </div>
          <CreateWorkflowDialog triggerText="构建你的第一个 Workflow" />
        </div>
      );
    }
    return <div>{JSON.stringify(workflows, null, 4)}</div>;
  } catch {
    return (
      <Alert variant={'destructive'}>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>错误</AlertTitle>
        <AlertDescription>
          Oops... 好像哪儿有点问题, 请稍后重试
        </AlertDescription>
      </Alert>
    );
  }
};

export default function WorkflowsPage() {
  return (
    <div className="flex h-full flex-1 flex-col">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold">Workflows</h1>
          <p className="text-muted-foreground">管理你的 Workflows</p>
        </div>
        <CreateWorkflowDialog triggerText="新建 Workflow" />
      </div>

      <div className="h-full py-6">
        <Suspense fallback={<UserWorkflowsSkeleton />}>
          <UserWorkflows />
        </Suspense>
      </div>
    </div>
  );
}
