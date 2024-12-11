import { useReactFlow } from '@xyflow/react';
import { AppNode, TaskInputParamType, TaskParamType } from '../../data';
import { StringParam } from './param/string-param';
import { useCallback } from 'react';
import { BrowserInstanceParam } from './param/browserInstance-param';

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
  const value = node?.data.inputs?.[param.name];

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
      return <BrowserInstanceParam param={param} />;
    default:
      return (
        <div className="w-full">
          <p className="text-xs text-muted-foreground">Not implemented</p>
        </div>
      );
  }
};
