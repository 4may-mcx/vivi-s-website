import { AppNode, TaskInputParamType, TaskParamType } from '@/types/workflow';
import { useReactFlow } from '@xyflow/react';
import { useCallback } from 'react';
import { BrowserInstanceParam } from './param/browserInstance-param';
import { StringParam } from './param/string-param';
import { VariableSelectParam } from './param/variable-select-param';
import { VariableGroupParam } from './param/variable-group-param';

export const NodeParamField = ({
  param,
  nodeId,
  disabled,
}: {
  param: TaskInputParamType;
  nodeId: string;
  disabled?: boolean;
}) => {
  const { updateNodeData, getNode } = useReactFlow();
  const node = getNode(nodeId) as AppNode;
  const value = node?.data.inputs?.[param.name] ?? '';

  const updateNodeParamValue = useCallback(
    (newValue: string) => {
      updateNodeData(nodeId, {
        inputs: {
          ...node?.data.inputs,
          [param.name]: newValue,
        },
      });
    },
    [node?.data.inputs, nodeId, param.name, updateNodeData],
  );

  switch (param.type) {
    case TaskParamType.STRING:
      return (
        <StringParam
          param={param}
          value={value}
          updateNodeParamValue={updateNodeParamValue}
          disabled={disabled}
        />
      );
    case TaskParamType.BROWSER_INSTANCE:
      return (
        <BrowserInstanceParam
          param={param}
          value={value}
          updateNodeParamValue={updateNodeParamValue}
        />
      );
    case TaskParamType.VARIABLE_SELECTOR:
      return (
        <VariableSelectParam
          param={param}
          value={value}
          updateNodeParamValue={updateNodeParamValue}
        />
      );
    case TaskParamType.VARIABLE_GROUP:
      return (
        <VariableGroupParam
          param={param}
          value={value}
          updateNodeParamValue={updateNodeParamValue}
        />
      );
    default:
      return (
        <div className="w-full">
          <p className="text-xs text-muted-foreground">Not implemented</p>
        </div>
      );
  }
};
