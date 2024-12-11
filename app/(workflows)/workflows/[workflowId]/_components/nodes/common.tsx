import { TaskParamType } from '@/types/workflow';

export const ColorForHandle: Record<TaskParamType, string> = {
  [TaskParamType.STRING]: '!bg-amber-400',
  [TaskParamType.BROWSER_INSTANCE]: '!bg-sky-400',
};
