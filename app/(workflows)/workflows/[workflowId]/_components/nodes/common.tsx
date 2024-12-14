import { TaskParamType } from '@/types/workflow';

export const ColorForHandle: Record<TaskParamType, string> = {
  [TaskParamType.STRING]: '!bg-amber-400',
  [TaskParamType.BROWSER_INSTANCE]: '!bg-sky-400',

  [TaskParamType.VARIABLE_GROUP]: '!bg-green-600',
  [TaskParamType.VARIABLE_SELECTOR]: '!bg-green-600',
};
