import { ReactFlowProvider } from '@xyflow/react';
import { FlowEditor } from './_components/flow-editor';
import { TopBar } from './_components/top-bar';
import { GetWorkFlowById } from '@/actions/workflows/getWorkflowsForUser';

export default async function WorkflowEditorPage({
  params,
}: {
  params: { workflowId: string };
}) {
  const workflow = await GetWorkFlowById(params.workflowId);

  return (
    <div className="flex h-full w-full flex-col overflow-hidden">
      <ReactFlowProvider>
        <TopBar
          title="WorkFlow Editor"
          subTitle="逐字稿编辑"
          workflowId={params.workflowId}
        />
        <FlowEditor workflow={workflow} />
      </ReactFlowProvider>
    </div>
  );
}
