import { WorkflowTask, TaskParamType, TaskType } from '@/types/workflow';
import { GlobeIcon, LucideProps, TextSelectIcon } from 'lucide-react';

export const VariableGroupTask = {
  type: TaskType.VARIABLE_GROUP,
  label: 'Variable Group',
  icon: (props: LucideProps) => (
    <TextSelectIcon className="stroke-green-600" {...props} />
  ),
  isEntryPoint: true,
  inputs: [
    {
      label: '变量组',
      name: 'variable group',
      type: TaskParamType.VARIABLE_SELECTOR,
      helperText: '请选择需要的变量组',
      hideHandle: true,
    },
  ] as const,
  outputs: [
    {
      name: 'params',
      type: TaskParamType.VARIABLE_GROUP,
    },
  ] as const,
} satisfies WorkflowTask;
