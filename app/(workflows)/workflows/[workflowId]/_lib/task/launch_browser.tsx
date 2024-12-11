import { GlobeIcon, LucideProps } from 'lucide-react';
import { RegistryItemType, TaskParamType, TaskType } from '../../data';

export const LaunchBrowserTask: RegistryItemType = {
  type: TaskType.LAUNCH_BROWSER,
  label: 'Launch browser',
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
  outputs: [
    {
      name: 'Web page',
      type: TaskParamType.BROWSER_INSTANCE,
    },
  ],
};
