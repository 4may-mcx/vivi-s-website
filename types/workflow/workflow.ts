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
  inputs: TaskInputParamType[];
  outputs: TaskOutputParamType[];
}

export interface WorkflowExecutionPlanPhase {
  phase: number;
  nodes: AppNode[];
}

export type WorkflowExecutionPlan = WorkflowExecutionPlanPhase[];

export enum WorkflowExecutionStatus {
  PENDING = 'PENDING',
  RUNNING = 'RUNNING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}

export enum WorkflowExecutionTrigger {
  MANUAL = 'MANUAL',
}

export enum WorkflowExecutionPhaseStatus {
  CREATED = 'CREATED',
  PENDING = 'PENDING',
  RUNNING = 'RUNNING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}

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
