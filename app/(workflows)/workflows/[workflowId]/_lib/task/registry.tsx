import { RegistryItemType, TaskType } from '../../data';
import { LaunchBrowserTask } from './launch_browser';
import { PageToHtmlTask } from './page-to-html';

export const TaskRegistry: Record<TaskType, RegistryItemType> = {
  LAUNCH_BROWSER: LaunchBrowserTask,
  PAGE_TO_HTML: PageToHtmlTask,
};
