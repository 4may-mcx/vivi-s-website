import { WorkflowTaskEnvironment } from '@/types/workflow';
import { VariableCalcTask } from '../task/variable-calc';

export const VariableCalcExecutor = async (
  environment: WorkflowTaskEnvironment<typeof VariableCalcTask>,
): Promise<boolean> => {
  try {
    return true;
  } catch (error: any) {
    environment.log.error(error.message);
    return false;
  }

  return true;
};
