import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Handle, Position, useEdges } from '@xyflow/react';
import { ReactNode } from 'react';
import { TaskInputParamType } from '../../data';
import { NodeParamField } from './node-param-field';
import { ColorForHandle } from './common';

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
  const edges = useEdges();
  const isConnected = edges.some(
    (edge) => edge.target === nodeId && edge.targetHandle === input.name,
  );

  return (
    <div className="relative flex w-full justify-start bg-secondary p-3">
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
