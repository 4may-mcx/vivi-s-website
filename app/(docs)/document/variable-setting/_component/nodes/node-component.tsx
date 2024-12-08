import { NodeProps } from '@xyflow/react';
import { memo } from 'react';
import { AppNodeData } from '../../data';
import { NodeCard } from './node-card';
import { NodeHeader } from './node-header';
import { TaskRegistry } from '../../_lib/task/registry';
import { NodeInput, NodeInputs } from './node-inputs';

export const NodeComponent = memo(({ id, selected, data }: NodeProps) => {
  const nodeData = data as AppNodeData;
  const task = TaskRegistry[nodeData.type];

  return (
    <NodeCard nodeId={id} isSelected={selected}>
      <NodeHeader taskType={nodeData.type} />
      <NodeInputs>
        {task?.inputs &&
          task.inputs.map((input) => (
            <NodeInput key={input.name} input={input} nodeId={id} />
          ))}
      </NodeInputs>
    </NodeCard>
  );
});

NodeComponent.displayName = 'NodeComponent';
