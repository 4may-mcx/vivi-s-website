import { TaskType } from '@/types/workflow';
import { ExtractTextFromElementExecutor } from './extract-text-from-element-executor';
import { LaunchBrowserExecutor } from './launch-browser-executor';
import { PageToHtmlExecutor } from './page-to-html-executor';

export const ExecutorRegistry: Record<TaskType, any> = {
  [TaskType.LAUNCH_BROWSER]: LaunchBrowserExecutor,
  [TaskType.PAGE_TO_HTML]: PageToHtmlExecutor,
  [TaskType.EXTRACT_TEXT_FROM_ELEMENT]: ExtractTextFromElementExecutor,
};
