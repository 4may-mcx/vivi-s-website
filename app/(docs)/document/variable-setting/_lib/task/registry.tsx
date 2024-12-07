import { RegistryItemType, TaskType } from '../../data';
import { VariableGroupTask } from './variable-group';

export const TaskRegistry: Record<TaskType, RegistryItemType> = {
  VARIABLE_GROUP: VariableGroupTask,
};
