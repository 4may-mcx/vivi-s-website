'use client';

import { Badge } from '@/components/ui/badge';
import { AppNodeData } from '@/types/workflow';
import { NodeProps } from '@xyflow/react';
import { memo, useState } from 'react';
import { NodeTaskContextProvider } from '../../_context/node-task.context';
import { TaskRegistry } from '../../_lib/task/registry';
import { NodeCard } from './node-card';
import { NodeHeader } from './node-header';
import { NodeInput, NodeInputs } from './node-inputs';
import { NodeOutput, NodeOutputs } from './node-outputs';

const DEV_MODE = process.env.NEXT_PUBLIC_DEV_MODE === 'true';

export const NodeComponent = memo(({ id, selected, data }: NodeProps) => {
  const nodeData = data as AppNodeData;
  const [task, setTask] = useState(TaskRegistry[nodeData.type]);

  return (
    <NodeTaskContextProvider value={{ task, setTask }}>
      <NodeCard nodeId={id} isSelected={selected}>
        {DEV_MODE && <Badge className="rounded-sm rounded-b-none">{id}</Badge>}
        <NodeHeader taskType={nodeData.type} nodeId={id} />
        <NodeInputs>
          {task?.inputs &&
            task.inputs.map((input) => (
              <NodeInput key={input.name} input={input} nodeId={id} />
            ))}
        </NodeInputs>
        <NodeOutputs>
          {task?.outputs &&
            task.outputs.map((output) => (
              <NodeOutput key={output.name} output={output} />
            ))}
        </NodeOutputs>
      </NodeCard>
    </NodeTaskContextProvider>
  );
});

NodeComponent.displayName = 'NodeComponent';
