export enum TaskType {
  LAUNCH_BROWSER = 'LAUNCH_BROWSER',
  PAGE_TO_HTML = 'PAGE_TO_HTML',
  EXTRACT_TEXT_FROM_ELEMENT = 'EXTRACT_TEXT_FROM_ELEMENT',

  VARIABLE_GROUP = 'VARIABLE_GROUP',
  VARIABLE_CALC = 'VARIABLE_CALC',
}

export enum TaskParamType {
  STRING = 'STRING',
  BROWSER_INSTANCE = 'BROWSER_INSTANCE',

  VARIABLE_SELECTOR = 'VARIABLE_SELECTOR',
  VARIABLE_GROUP = 'VARIABLE_GROUP',
}

export interface TaskParamBasicType {
  name: string;
  type: TaskParamType;
  label?: string;
  value?: string;
  helperText?: string;
  hideHandle?: boolean;
  [key: string]: any;
}

export type TaskInputParamType = TaskParamBasicType & {
  required?: boolean;
};

export type TaskOutputParamType = TaskParamBasicType;

export interface TaskParamProps {
  param: TaskInputParamType;
  value: string;
  updateNodeParamValue: (newValue: string) => void;
  disabled?: boolean;
}
