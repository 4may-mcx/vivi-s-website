import { GlobeIcon, LucideProps } from 'lucide-react';
import { RegistryItemType, TaskParamType, TaskType } from '../../data';

export const VariableGroupTask: RegistryItemType = {
  type: TaskType.VARIABLE_GROUP,
  label: '变量组',
  icon: (props: LucideProps) => (
    <GlobeIcon className="stroke-green-800" {...props} />
  ),
  isEntryPoint: true,
  inputs: [
    {
      name: 'Website Url',
      type: TaskParamType.STRING,
      helperText: 'eg: https://www.google.com',
      required: true,
      hideHandle: true,
    },
  ],
};
