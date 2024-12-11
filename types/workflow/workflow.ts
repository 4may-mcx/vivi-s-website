import { LucideProps } from 'lucide-react';
import { ReactNode } from 'react';
import { AppNode } from './appNode';
import { TaskInputParamType, TaskOutputParamType, TaskType } from './task';

export enum WorkflowStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
}

export interface WorkflowTask {
  type: TaskType;
  label: string;
  icon: (props: LucideProps) => ReactNode;
  isEntryPoint?: boolean;
  inputs?: TaskInputParamType[];
  outputs?: TaskOutputParamType[];
}

export type WorkflowExecutionPlan = {
  phase: number;
  nodes: AppNode;
};

export interface FlowVariableItemType {
  label: string;
  value: string | number | boolean;
}

export type FlowInputType = Record<string, FlowVariableItemType>;

export interface FlowOutputType {
  name: string; // 输出组名称
  desc: string; // 组简介
  variable: FlowVariableItemType[];
}
