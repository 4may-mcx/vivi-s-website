import { TaskType, WorkflowTask } from '@/types/workflow';
import { ExtractTextFromElementTask } from './extract-text-from-element';
import { LaunchBrowserTask } from './launch_browser';
import { PageToHtmlTask } from './page-to-html';
import { VariableCalcTask } from './variable-calc';
import { VariableGroupTask } from './variable-group';

export const TaskRegistry: Record<TaskType, WorkflowTask> = {
  [TaskType.LAUNCH_BROWSER]: LaunchBrowserTask,
  [TaskType.PAGE_TO_HTML]: PageToHtmlTask,
  [TaskType.EXTRACT_TEXT_FROM_ELEMENT]: ExtractTextFromElementTask,

  [TaskType.VARIABLE_GROUP]: VariableGroupTask,
  [TaskType.VARIABLE_CALC]: VariableCalcTask,
};
