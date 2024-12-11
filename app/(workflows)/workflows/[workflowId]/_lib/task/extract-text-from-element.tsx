import { WorkflowTask, TaskParamType, TaskType } from '@/types/workflow';
import { LucideProps, TextIcon } from 'lucide-react';

export const ExtractTextFromElementTask: WorkflowTask = {
  type: TaskType.EXTRACT_TEXT_FROM_ELEMENT,
  label: 'Extract text from element',
  icon: (props: LucideProps) => (
    <TextIcon className="stroke-pink-400" {...props} />
  ),
  isEntryPoint: false,
  inputs: [
    {
      name: 'Html',
      type: TaskParamType.STRING,
      required: true,
      variant: 'textarea',
    },
    {
      name: 'Selector',
      type: TaskParamType.STRING,
      required: true,
    },
  ],
  outputs: [
    {
      name: 'Extracted Text',
      type: TaskParamType.STRING,
    },
  ],
};
