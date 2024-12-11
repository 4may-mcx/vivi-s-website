import { NodeProps } from '@xyflow/react';
import { memo } from 'react';
import { AppNodeData } from '../../data';
import { NodeCard } from './node-card';
import { NodeHeader } from './node-header';
import { TaskRegistry } from '../../_lib/task/registry';
import { NodeInput, NodeInputs } from './node-inputs';
import { NodeOutput, NodeOutputs } from './node-outputs';

export const NodeComponent = memo(({ id, selected, data }: NodeProps) => {
  const nodeData = data as AppNodeData;
  const task = TaskRegistry[nodeData.type];

  return (
    <NodeCard nodeId={id} isSelected={selected}>
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
  );
});

NodeComponent.displayName = 'NodeComponent';
