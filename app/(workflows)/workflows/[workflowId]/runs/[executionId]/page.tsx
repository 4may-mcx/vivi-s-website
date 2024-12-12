import { Loader2Icon } from 'lucide-react';
import { TopBar } from '../../_components/top-bar';
import { Suspense } from 'react';
import { waitFor } from '@/lib/helper';
import { GetWorkExecutionWithPhases } from '@/actions/workflows/getWorkExecutionWithPhases';

const ExecutionViewerWrapper = async ({
  executionId,
}: {
  executionId: string;
}) => {
  const workflowExecution = await GetWorkExecutionWithPhases(executionId);
  if (!workflowExecution) {
    return <div>Execution not found</div>;
  }
  return <pre>{JSON.stringify(workflowExecution, null, 4)}</pre>;
};

export default function RunWorkflowPage({
  params: { workflowId, executionId },
}: {
  params: { workflowId: string; executionId: string };
}) {
  return (
    <div className="flex h-screen w-full flex-col overflow-hidden">
      <TopBar
        workflowId={workflowId}
        title="Workflow run details"
        subTitle={`Run ID: ${executionId}`}
        hideBtns
      />
      <section className="flex h-full flex-col overflow-auto">
        <Suspense
          fallback={
            <div className="flex h-full w-full items-center justify-center">
              <Loader2Icon className="h-10 w-10 animate-spin stroke-primary" />
            </div>
          }
        >
          <ExecutionViewerWrapper executionId={executionId} />
        </Suspense>
      </section>
    </div>
  );
}
