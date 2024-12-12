'use client';

import { AppNodeMissingInputs } from '@/types/workflow';
import { createContext, Dispatch, SetStateAction, useState } from 'react';

export interface FlowValidationContextType {
  invalidInputs: AppNodeMissingInputs[];
  setInvalidInputs: Dispatch<SetStateAction<AppNodeMissingInputs[]>>;
  clearErrors: () => void;
}

export const FlowValidationContext =
  createContext<FlowValidationContextType | null>(null);

export const FlowValidationContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [invalidInputs, setInvalidInputs] = useState<AppNodeMissingInputs[]>(
    [],
  );

  const clearErrors = () => {
    setInvalidInputs([]);
  };

  return (
    <FlowValidationContext.Provider
      value={{ invalidInputs, setInvalidInputs, clearErrors }}
    >
      {children}
    </FlowValidationContext.Provider>
  );
};