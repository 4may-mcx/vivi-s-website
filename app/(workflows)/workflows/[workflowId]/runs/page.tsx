import { TopBar } from '../_components/topBar/top-bar';
import { ExecutionsTable } from './_components/executions-table';

export default function ExecutionsPage({
  params: { workflowId },
}: {
  params: { workflowId: string };
}) {
  return (
    <div className="h-full w-full overflow-auto">
      <TopBar
        workflowId={workflowId}
        title="All runs"
        hideBtns
        subTitle="List of all your workflow runs"
      />
      <ExecutionsTable workflowId={workflowId} />
    </div>
  );
}
