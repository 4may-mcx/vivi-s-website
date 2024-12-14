import { WorkflowTaskEnvironment } from '@/types/workflow';
import { VariableGroupTask } from '../task/variable-group';

export const VariableGroupExecutor = async (
  environment: WorkflowTaskEnvironment<typeof VariableGroupTask>,
): Promise<boolean> => {
  try {
    return true;
  } catch (error: any) {
    environment.log.error(error.message);
    return false;
  }

  return true;
};
