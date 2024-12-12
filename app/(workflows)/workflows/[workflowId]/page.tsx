import { GetWorkFlowById } from '@/actions/workflows/getWorkflowsForUser';
import { ReactFlowProvider } from '@xyflow/react';
import { FlowEditor } from './_components/flow-editor';
import { TaskMenu } from './_components/task-menu';
import { TopBar } from './_components/top-bar';
import { FlowValidationContextProvider } from './_context/flow-validation-context';

export default async function WorkflowEditorPage({
  params,
}: {
  params: { workflowId: string };
}) {
  const workflow = await GetWorkFlowById(params.workflowId);

  return (
    <div className="flex h-full w-full flex-col overflow-hidden">
      <ReactFlowProvider>
        <FlowValidationContextProvider>
          <TopBar
            title="WorkFlow Editor"
            subTitle="逐字稿编辑"
            workflowId={params.workflowId}
          />
          <div className="flex h-full w-full">
            <TaskMenu />
            <FlowEditor workflow={workflow} />
          </div>
        </FlowValidationContextProvider>
      </ReactFlowProvider>
    </div>
  );
}
