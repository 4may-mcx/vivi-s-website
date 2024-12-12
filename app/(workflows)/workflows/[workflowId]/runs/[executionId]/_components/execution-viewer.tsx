'use client';

import { GetWorkExecutionWithPhases } from '@/actions/workflows/getWorkExecutionWithPhases';
import { GetWorkflowPhaseDetails } from '@/actions/workflows/getWorkflowPhaseDetails';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { datesToDurationString } from '@/lib/helper';
import { cn } from '@/lib/utils';
import { WorkflowExecutionStatus } from '@/types/workflow';
import { useQuery } from '@tanstack/react-query';
import { formatDistanceToNow } from 'date-fns';
import {
  CalendarIcon,
  CircleDashedIcon,
  Clock,
  Loader2Icon,
  LucideIcon,
  WorkflowIcon,
} from 'lucide-react';
import { ReactNode, useState } from 'react';

const ExecutionLabel = ({
  icon: Icon,
  value,
  label,
}: {
  icon: LucideIcon;
  value: ReactNode;
  label: ReactNode;
}) => {
  return (
    <div className="flex items-center justify-between px-4 py-2 text-sm">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Icon size={20} className="stroke-muted-foreground/80" />
        <span>{label}</span>
      </div>
      <div className="flex items-center gap-2 font-semibold capitalize">
        {value}
      </div>
    </div>
  );
};

type ExecutionData = Awaited<ReturnType<typeof GetWorkExecutionWithPhases>>;

export const ExecutionViewer = ({
  initialData,
}: {
  initialData: ExecutionData;
}) => {
  const [selectedPhase, setSelectedPhase] = useState<string | null>(null);

  const query = useQuery({
    queryKey: ['execution', initialData?.id],
    initialData,
    queryFn: () => GetWorkExecutionWithPhases(initialData!.id),
    refetchInterval: (q) =>
      q.state.data?.status === WorkflowExecutionStatus.RUNNING ? 1000 : false,
  });

  const phaseDetails = useQuery({
    queryKey: ['phaseDetails', selectedPhase],
    enabled: selectedPhase !== null,
    queryFn: () => GetWorkflowPhaseDetails(selectedPhase!),
  });

  const duration = datesToDurationString(
    query.data?.startedTime,
    query.data?.completedTime,
  );

  const isRunning = query.data?.status === WorkflowExecutionStatus.RUNNING;

  const handlePhaseClick = (phaseId: string) => {
    if (isRunning) return;
    setSelectedPhase(phaseId);
  };

  return (
    <div className="flex h-full w-full">
      <aside className="flex w-[350px] min-w-[350px] max-w-[350px] flex-grow flex-col overflow-hidden border-r-2">
        <div className="px-2 py-4">
          <ExecutionLabel
            icon={CircleDashedIcon}
            label="Status"
            value={query.data?.status}
          />
          <ExecutionLabel
            icon={CalendarIcon}
            label="Started at"
            value={
              <span className="lowercase">
                {query.data?.startedTime
                  ? formatDistanceToNow(query.data?.startedTime, {
                      addSuffix: true,
                    })
                  : '-'}
              </span>
            }
          />
          <ExecutionLabel
            icon={Clock}
            label="Duration"
            value={
              duration ? (
                duration
              ) : (
                <Loader2Icon className="animate-spin" size={20} />
              )
            }
          />
        </div>
        <Separator />
        <div className="flex items-center justify-center px-2 py-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <WorkflowIcon size={20} className="stroke-muted-foreground" />
            <span className="font-semibold">Phases</span>
          </div>
        </div>
        <Separator />
        {query.data?.phases.map((phase, index) => (
          <Button
            key={phase.id}
            variant={selectedPhase === phase.id ? 'secondary' : 'ghost'}
            onClick={() => handlePhaseClick(phase.id)}
            className={cn(
              'w-full justify-between rounded-none',
              isRunning && 'cursor-not-allowed',
            )}
          >
            <div className="flex items-center gap-2">
              <Badge variant="outline">{index + 1}</Badge>
              <p className="font-semibold">{phase.name}</p>
            </div>
            <p className="text-xs text-muted-foreground">{phase.status}</p>
          </Button>
        ))}
      </aside>
      <div className="flex h-full w-full">
        <pre>{JSON.stringify(phaseDetails.data, null, 2)}</pre>
      </div>
    </div>
  );
};
