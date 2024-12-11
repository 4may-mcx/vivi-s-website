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
