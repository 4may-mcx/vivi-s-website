import { Node } from '@xyflow/react';
import { LucideProps } from 'lucide-react';
import { ReactNode } from 'react';

export enum TaskType {
  // VARIABLE_GROUP = 'VARIABLE_GROUP',
  LAUNCH_BROWSER = 'LAUNCH_BROWSER',
  PAGE_TO_HTML = 'PAGE_TO_HTML',
  EXTRACT_TEXT_FROM_ELEMENT = 'EXTRACT_TEXT_FROM_ELEMENT',
}

export enum TaskParamType {
  STRING = 'STRING',
  BROWSER_INSTANCE = 'BROWSER_INSTANCE',
}

export interface TaskParamBasicType {
  name: string;
  type: TaskParamType;
  helperText?: string;
  hideHandle?: boolean;
  value?: string;
  [key: string]: any;
}

export type TaskInputParamType = TaskParamBasicType & {
  required?: boolean;
};

export type TaskOutputParamType = TaskParamBasicType;

export interface TaskParamProps {
  param: TaskInputParamType;
  value?: string;
  updateNodeParamValue?: (newValue: string) => void;
  disabled?: boolean;
}

export interface RegistryItemType {
  type: TaskType;
  label: string;
  icon: (props: LucideProps) => ReactNode;
  isEntryPoint?: boolean;
  inputs?: TaskInputParamType[];
  outputs?: TaskInputParamType[];
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
