import { WorkflowTaskEnvironment } from '@/types/workflow';
import { PageToHtmlTask } from '../task/page-to-html';

export const PageToHtmlExecutor = async (
  environment: WorkflowTaskEnvironment<typeof PageToHtmlTask>,
): Promise<boolean> => {
  try {
    const html = await environment.getPage()!.content();
    environment.setOutput('Html', html);
    environment.log.info('Page to HTML conversion successful');
  } catch (error: any) {
    environment.log.error(error.message);
    return false;
  }
  return true;
};
