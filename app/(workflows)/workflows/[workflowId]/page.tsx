import { ReactFlowProvider } from '@xyflow/react';
import { FlowEditor } from './_components/flow-editor';
import { TopBar } from './_components/top-bar';

export default function WorkflowEditorPage({
  params,
}: {
  params: { workflowId: string };
}) {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden">
      <ReactFlowProvider>
        {params.workflowId}
        <TopBar title="WorkFlow Editor" subTitle="逐字稿编辑" />
        <FlowEditor />
      </ReactFlowProvider>
    </div>
  );
}
