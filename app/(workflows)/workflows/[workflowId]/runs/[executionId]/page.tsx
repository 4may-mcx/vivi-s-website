import { GetWorkExecutionWithPhases } from '@/actions/workflows/getWorkExecutionWithPhases';
import { Loader2Icon } from 'lucide-react';
import { Suspense } from 'react';
import { TopBar } from '../../_components/top-bar';
import { ExecutionViewer } from './_components/execution-viewer';
import { redirect } from 'next/navigation';

const ExecutionViewerWrapper = async ({
  executionId,
  workflowId,
}: {
  executionId: string;
  workflowId: string;
}) => {
  const workflowExecution = await GetWorkExecutionWithPhases(executionId);
  if (!workflowExecution) {
    return redirect(`/workflows/${workflowId}`);
  }
  return <ExecutionViewer initialData={workflowExecution} />;
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
          <ExecutionViewerWrapper
            executionId={executionId}
            workflowId={workflowId}
          />
        </Suspense>
      </section>
    </div>
  );
}
