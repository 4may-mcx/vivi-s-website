import { cn } from '@/lib/utils';
import { TaskInputParamType } from '@/types/workflow';
import { Handle, Position, useEdges } from '@xyflow/react';
import { ReactNode } from 'react';
import { ColorForHandle } from './common';
import { NodeParamField } from './node-param-field';
import { useFlowValidation } from '../../_hooks/use-flow-validation';

export const NodeInputs = ({ children }: { children: ReactNode }) => {
  return <div className="flex flex-col gap-2 divide-y">{children}</div>;
};

export const NodeInput = ({
  input,
  nodeId,
}: {
  input: TaskInputParamType;
  nodeId: string;
}) => {
  const { invalidInputs } = useFlowValidation();
  const edges = useEdges();
  const isConnected = edges.some(
    (edge) => edge.target === nodeId && edge.targetHandle === input.name,
  );
  const hasInvalidInput = invalidInputs
    .find((node) => node.nodeId === nodeId)
    ?.inputs.includes(input.name);

  return (
    <div
      className={cn(
        'relative flex w-full justify-start bg-secondary p-3',
        hasInvalidInput && 'bg-destructive/30',
      )}
    >
      <NodeParamField param={input} nodeId={nodeId} disabled={isConnected} />
      {!input.hideHandle && (
        <Handle
          id={input.name}
          type="target"
          position={Position.Left}
          isConnectable={!isConnected}
          className={cn(
            '!-left-2 !h-4 !w-4 !border-2 !border-background !bg-muted-foreground',
            ColorForHandle[input.type],
          )}
        />
      )}
    </div>
  );
};
