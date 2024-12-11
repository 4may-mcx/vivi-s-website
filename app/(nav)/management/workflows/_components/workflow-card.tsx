import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { WorkflowStatus } from '@/types/workflow/workflow';
import { Workflow } from '@prisma/client';
import {
  FileTextIcon,
  MoreVerticalIcon,
  PlayIcon,
  ShuffleIcon,
} from 'lucide-react';
import Link from 'next/link';
import { DeleteWorkflowBtn } from './delete-workflow-btn';

const StatusColors: Record<WorkflowStatus, string> = {
  [WorkflowStatus.DRAFT]: 'bg-yellow-400 text-yellow-600',
  [WorkflowStatus.PUBLISHED]: 'bg-green-600',
};

const WorkflowActions = ({ workflowId }: { workflowId: string }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex h-full w-full items-center justify-center p-1">
          <MoreVerticalIcon size={18} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>操作</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex items-center gap-2 text-destructive">
          <DeleteWorkflowBtn workflowId={workflowId} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const WorkflowCard = ({ workflow }: { workflow: Workflow }) => {
  const isDraft = workflow.status === WorkflowStatus.DRAFT;
  return (
    <Card className="border-separate overflow-hidden rounded-lg border shadow-sm hover:shadow-md">
      <CardContent className="flex h-[100px] items-center justify-between p-4">
        <div className="flex items-center justify-end space-x-3">
          <div
            className={cn(
              'flex h-10 w-10 items-center justify-center rounded-full',
              StatusColors[workflow.status as WorkflowStatus],
            )}
          >
            {isDraft ? (
              <FileTextIcon className="h-5 w-5" />
            ) : (
              <PlayIcon className="h-5 w-5 text-white" />
            )}
          </div>
          <div>
            <h3 className="flex items-center text-base font-bold text-muted-foreground">
              <Link
                href={`/workflows/${workflow.id}`}
                className="flex items-center hover:underline"
              >
                <p className="max-w-[180px] overflow-hidden text-ellipsis whitespace-nowrap">
                  {workflow.name}
                </p>
              </Link>
              {isDraft && (
                <span className="ml-2 rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-800">
                  Draft
                </span>
              )}
            </h3>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Link
            href={`/workflows/${workflow.id}`}
            className={cn(
              buttonVariants({
                variant: 'outline',
                size: 'sm',
              }),
              'flex items-center gap-2',
            )}
          >
            <ShuffleIcon size={16} />
            <span>编辑</span>
          </Link>
          <WorkflowActions workflowId={workflow.id} />
        </div>
      </CardContent>
    </Card>
  );
};
