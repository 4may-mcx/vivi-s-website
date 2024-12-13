import { WorkflowTaskEnvironment } from '@/types/workflow';
import { ExtractTextFromElementTask } from '../task/extract-text-from-element';
import * as cheerio from 'cheerio';

export const ExtractTextFromElementExecutor = async (
  environment: WorkflowTaskEnvironment<typeof ExtractTextFromElementTask>,
): Promise<boolean> => {
  try {
    const selector = environment.getInput('Selector');
    if (!selector) {
      return false;
    }
    const html = environment.getInput('Html');
    if (!html) {
      return false;
    }

    const $ = cheerio.load(html);
    const element = $(selector);
    if (!element) {
      console.error('@ELEMENT_NOT_FOUND');
      return false;
    }

    const text = element.text();
    if (!text) {
      console.error('@ELEMENT_TEXT_NOT_FOUND');
      return false;
    }

    environment.setOutput('Extracted Text', text);
  } catch (error) {
    return false;
  }
  return true;
};
