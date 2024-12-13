import { WorkflowTaskEnvironment } from '@/types/workflow';
import { ExtractTextFromElementTask } from '../task/extract-text-from-element';
import * as cheerio from 'cheerio';

export const ExtractTextFromElementExecutor = async (
  environment: WorkflowTaskEnvironment<typeof ExtractTextFromElementTask>,
): Promise<boolean> => {
  try {
    const selector = environment.getInput('Selector');
    if (!selector) {
      environment.log.error('selector is not provided');
      return false;
    }
    const html = environment.getInput('Html');
    if (!html) {
      environment.log.error('html is not provided');
      return false;
    }

    const $ = cheerio.load(html);
    const element = $(selector);
    if (!element) {
      environment.log.error('element is not found');
      return false;
    }

    const text = element.text();
    if (!text) {
      environment.log.error('element text is not found');
      return false;
    }

    environment.setOutput('Extracted Text', text);
  } catch (error) {
    return false;
  }
  return true;
};
