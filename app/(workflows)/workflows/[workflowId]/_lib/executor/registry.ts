import {
  TaskType,
  WorkflowTaskEnvironment,
  WorkflowTask,
} from '@/types/workflow';
import { ExtractTextFromElementExecutor } from './extract-text-from-element-executor';
import { LaunchBrowserExecutor } from './launch-browser-executor';
import { PageToHtmlExecutor } from './page-to-html-executor';

type ExecutorFn<T extends WorkflowTask> = (
  environment: WorkflowTaskEnvironment<T>,
) => Promise<boolean>;

type RegistryType = {
  [K in TaskType]: ExecutorFn<WorkflowTask & { type: K }>;
};

export const ExecutorRegistry: RegistryType = {
  [TaskType.LAUNCH_BROWSER]: LaunchBrowserExecutor,
  [TaskType.PAGE_TO_HTML]: PageToHtmlExecutor,
  [TaskType.EXTRACT_TEXT_FROM_ELEMENT]: ExtractTextFromElementExecutor,
};
