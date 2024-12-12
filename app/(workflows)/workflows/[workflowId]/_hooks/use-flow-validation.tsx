import { useContext } from 'react';
import { FlowValidationContext } from '../_context/flow-validation-context';

export const useFlowValidation = () => {
  const context = useContext(FlowValidationContext);
  if (!context) {
    throw new Error(
      'useFlowValidation must be used within a FlowValidationContextProvider',
    );
  }
  return context;
};
