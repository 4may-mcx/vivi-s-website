import { ReactFlowProvider } from '@xyflow/react';
import { FlowEditor } from './_component/flow-editor';
import { TopBar } from './_component/top-bar';

export default function VariableSetting() {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden">
      <ReactFlowProvider>
        <TopBar title="WorkFlow Editor" subTitle="逐字稿编辑" />
        <FlowEditor />
      </ReactFlowProvider>
    </div>
  );
}
