import { Node } from '@xyflow/react';
import { LucideProps } from 'lucide-react';
import { ReactNode } from 'react';

export enum TaskType {
  VARIABLE_GROUP = 'VARIABLE_GROUP',
}

export enum TaskParamType {
  STRING = 'STRING',
}

export interface TaskInputParamType {
  name: string;
  type: TaskParamType;
  helperText?: string;
  required?: boolean;
  hideHandle?: boolean;
  value?: string;
  [key: string]: any;
}

export interface RegistryItemType {
  type: TaskType;
  label: string;
  icon: (props: LucideProps) => ReactNode;
  isEntryPoint?: boolean;
  inputs?: TaskInputParamType[];
}

export interface AppNodeData {
  type: TaskType;
  inputs: Record<string, string>;
  [key: string]: any;
}

export interface AppNode extends Node {
  data: AppNodeData;
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
