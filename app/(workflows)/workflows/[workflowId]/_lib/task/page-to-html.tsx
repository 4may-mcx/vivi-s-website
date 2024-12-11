import { CodeIcon, LucideProps } from 'lucide-react';
import { RegistryItemType, TaskParamType, TaskType } from '../../data';

export const PageToHtmlTask: RegistryItemType = {
  type: TaskType.PAGE_TO_HTML,
  label: 'Get html from page',
  icon: (props: LucideProps) => (
    <CodeIcon className="stroke-green-800" {...props} />
  ),
  isEntryPoint: false,
  inputs: [
    {
      name: 'Web page',
      type: TaskParamType.BROWSER_INSTANCE,
      required: true,
    },
  ],
  outputs: [
    {
      name: 'html',
      type: TaskParamType.STRING,
    },
    {
      name: 'Web page',
      type: TaskParamType.BROWSER_INSTANCE,
    },
  ],
};
