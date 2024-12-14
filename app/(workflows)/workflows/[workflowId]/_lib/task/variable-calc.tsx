import { TaskParamType, TaskType, WorkflowTask } from '@/types/workflow';
import { Calculator, LucideProps } from 'lucide-react';

export const VariableCalcTask = {
  type: TaskType.VARIABLE_CALC,
  label: 'Variable Calc Box',
  icon: (props: LucideProps) => (
    <Calculator className="stroke-green-600" {...props} />
  ),
  isEntryPoint: false,
  inputs: [
    {
      name: '输入变量组',
      type: TaskParamType.VARIABLE_GROUP,
      helperText: '选择其中的变量进行使用',
    },
  ] as const,
  outputs: [
    {
      name: '输出变量组',
      type: TaskParamType.VARIABLE_GROUP,
    },
  ] as const,
} satisfies WorkflowTask;
