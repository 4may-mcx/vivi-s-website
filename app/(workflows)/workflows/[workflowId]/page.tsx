import { GetWorkFlowById } from '@/actions/workflows/getWorkflowsForUser';
import { ReactFlowProvider } from '@xyflow/react';
import { redirect } from 'next/navigation';
import { FlowEditor } from './_components/flow-editor';
import { TaskMenu } from './_components/task-menu';
import { TopBar } from './_components/topBar/top-bar';
import { FlowValidationContextProvider } from './_context/flow-validation-context';

export default async function WorkflowEditorPage({
  params,
}: {
  params: { workflowId: string };
}) {
  const workflow = await GetWorkFlowById(params.workflowId);
  if (!workflow) {
    return redirect('/management/workflows');
  }

  return (
    <div className="flex h-full w-full flex-col overflow-hidden">
      <FlowValidationContextProvider>
        <ReactFlowProvider>
          <TopBar
            title={workflow?.name ?? 'WorkFlow Editor'}
            subTitle={workflow?.description ?? '暂无简介'}
            workflowId={params.workflowId}
          />
          <div className="flex h-full w-full">
            <TaskMenu />
            <FlowEditor workflow={workflow} />
          </div>
        </ReactFlowProvider>
      </FlowValidationContextProvider>
    </div>
  );
}
