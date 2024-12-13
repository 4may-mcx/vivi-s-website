'use client';

import { GetWorkflowExecutions } from '@/actions/workflows/getWorkflowExecutions';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useQuery } from '@tanstack/react-query';
import { Loader2Icon } from 'lucide-react';

export const ExecutionsTable = ({ workflowId }: { workflowId: string }) => {
  const query = useQuery({
    queryKey: ['executions', workflowId],
    initialData: [],
    queryFn: () => GetWorkflowExecutions(workflowId),
    refetchInterval: 5000,
  });

  const executions = query.data;
  const isLoading = query.isLoading;

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Loader2Icon size={30} className="animate-spin stroke-primary" />
      </div>
    );
  }

  if (!executions) {
    return <div>No executions found</div>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Started At</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {executions.map((execution) => (
          <TableRow key={execution.id}>
            <TableCell>{execution.id}</TableCell>
            <TableCell>{execution.status}</TableCell>
            <TableCell>
              {execution.startedTime?.toLocaleString('en-US', {
                dateStyle: 'short',
                timeStyle: 'short',
              })}
            </TableCell>
            <TableCell>
              <Button
                variant="outline"
                onClick={() => {
                  //   router.push(`/workflows/${workflowId}/runs/${execution.id}`);
                }}
              >
                View
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
