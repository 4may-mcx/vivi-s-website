import { WorkflowTaskEnvironment } from '@/types/workflow';
import { PageToHtmlTask } from '../task/page-to-html';

export const PageToHtmlExecutor = async (
  environment: WorkflowTaskEnvironment<typeof PageToHtmlTask>,
): Promise<boolean> => {
  try {
    const html = await environment.getPage()!.content();
    environment.setOutput('Html', html);
  } catch (error) {
    console.error('@PAGE_TO_HTML_ERROR: ', error);
    return false;
  }
  return true;
};
