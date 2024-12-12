import { AppNode } from '@/types/workflow';
import { useReactFlow } from '@xyflow/react';
import { useCallback } from 'react';
import { toast } from 'sonner';
import {
  flowToExecutionPlan,
  FlowToExecutionPlanType,
  FlowToExecutionPlanValidationError,
} from '../_lib/executionPlan';
import { useFlowValidation } from './use-flow-validation';

export const useExecutionPlan = () => {
  const { toObject } = useReactFlow();
  const { setInvalidInputs, clearErrors } = useFlowValidation();

  const handleErrors = useCallback(
    (errors: FlowToExecutionPlanType['errors']) => {
      switch (errors?.type) {
        case FlowToExecutionPlanValidationError.NO_ENTRY_POINT:
          toast.error('请设置工作流的入口节点');
          break;
        case FlowToExecutionPlanValidationError.INVALID_INPUT:
          toast.error('请检查工作流的输入节点');
          setInvalidInputs(errors?.invalidElements ?? []);
          break;
        default:
          toast.error('工作流存在未知错误');
          break;
      }
    },
    [setInvalidInputs, clearErrors],
  );

  const generateExecutionPlan = useCallback(() => {
    const { nodes, edges } = toObject();
    const { executionPlan, errors } = flowToExecutionPlan(
      nodes as AppNode[],
      edges,
    );

    if (errors) {
      handleErrors(errors);
      return null;
    }

    clearErrors();
    return executionPlan;
  }, [toObject, handleErrors, clearErrors]);

  return generateExecutionPlan;
};
