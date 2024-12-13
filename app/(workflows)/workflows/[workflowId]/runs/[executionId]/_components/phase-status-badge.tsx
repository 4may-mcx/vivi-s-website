import { WorkflowExecutionStatus } from '@/types/workflow';
import {
  CircleCheckIcon,
  CircleDashedIcon,
  CircleXIcon,
  Loader2Icon,
} from 'lucide-react';

export const PhaseStatusBadge = ({
  status,
}: {
  status: WorkflowExecutionStatus;
}) => {
  switch (status) {
    case WorkflowExecutionStatus.PENDING:
      return <CircleDashedIcon size={20} className="stroke-muted-foreground" />;
    case WorkflowExecutionStatus.RUNNING:
      return (
        <Loader2Icon className="animate-spin stroke-yellow-500" size={20} />
      );
    case WorkflowExecutionStatus.COMPLETED:
      return <CircleCheckIcon size={20} className="stroke-green-500" />;
    case WorkflowExecutionStatus.FAILED:
      return <CircleXIcon size={20} className="stroke-red-500" />;
    default:
      return <div className="rounded-full">{status}</div>;
  }
};
