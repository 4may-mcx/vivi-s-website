import { WorkflowTaskEnvironment } from '@/types/workflow';
import puppeteer from 'puppeteer';
import { LaunchBrowserTask } from '../task/launch_browser';

export const LaunchBrowserExecutor = async (
  environment: WorkflowTaskEnvironment<typeof LaunchBrowserTask>,
): Promise<boolean> => {
  try {
    const websiteUrl = environment.getInput('Website Url');
    const browser = await puppeteer.launch({
      headless: true,
    });
    environment.log.info('Browser launched successfully');

    environment.setBrowser(browser);

    const page = await browser.newPage();
    await page.goto(websiteUrl);
    environment.setPage(page);
    environment.log.info(`Opened page at ${websiteUrl}`);
  } catch (error: any) {
    environment.log.error(error.message);
    return false;
  }

  return true;
};
