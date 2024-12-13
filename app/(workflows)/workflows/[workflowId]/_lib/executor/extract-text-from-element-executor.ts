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
    environment.log.info(
      `Extracting text from element with selector: ${selector}`,
    );

    const html = environment.getInput('Html');
    if (!html) {
      environment.log.error('html is not provided');
      return false;
    }
    environment.log.info('html is provided');

    const $ = cheerio.load(html);
    const element = $(selector);
    if (!element) {
      environment.log.error('element is not found');
      return false;
    }
    environment.log.info('element is found');

    const text = element.text();
    if (!text) {
      environment.log.error('element text is not found');
      return false;
    }

    environment.setOutput('Extracted Text', text);
    environment.log.info('Extracted text is set');
  } catch (error) {
    return false;
  }
  return true;
};
