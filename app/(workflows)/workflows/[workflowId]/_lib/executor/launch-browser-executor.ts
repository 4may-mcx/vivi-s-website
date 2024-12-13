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

    environment.setBrowser(browser);

    const page = await browser.newPage();
    environment.setPage(page);

    await page.goto(websiteUrl);
  } catch (error: any) {
    environment.log.error(error.message);
    return false;
  }

  return true;
};
