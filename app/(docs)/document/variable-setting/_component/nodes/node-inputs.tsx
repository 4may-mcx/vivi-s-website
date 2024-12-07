import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Handle, Position } from '@xyflow/react';
import { ReactNode } from 'react';
import { TaskInputParamType } from '../../data';
import { NodeParamField } from './node-param-field';

export const NodeInputs = ({ children }: { children: ReactNode }) => {
  return <div className="flex flex-col gap-2 divide-y">{children}</div>;
};

export const NodeInput = ({ input }: { input: TaskInputParamType }) => {
  return (
    <div className="relative flex w-full justify-start bg-secondary p-3">
      <NodeParamField param={input} />
      {!input.hideHandle && (
        <Handle
          className={cn(
            '!-left-2 !h-4 !w-4 !border-2 !border-background !bg-muted-foreground',
          )}
          id={Input.name}
          type="target"
          position={Position.Left}
        />
      )}
    </div>
  );
};
