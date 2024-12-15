'use client';

import { WorkflowTask } from '@/types/workflow';
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
} from 'react';

export interface NodeTaskContextType {
  task: WorkflowTask;
  setTask: Dispatch<SetStateAction<WorkflowTask>>;
}

export const NodeTaskContext = createContext<NodeTaskContextType | null>(null);

export const NodeTaskContextProvider = ({
  value,
  children,
}: {
  value: NodeTaskContextType;
  children: ReactNode;
}) => {
  return (
    <NodeTaskContext.Provider value={value}>
      {children}
    </NodeTaskContext.Provider>
  );
};

export const useNodeTaskContext = () => {
  const context = useContext(NodeTaskContext);
  return context ?? ({} as NodeTaskContextType);
};
