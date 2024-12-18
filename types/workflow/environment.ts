import { Browser, Page } from 'puppeteer';
import { WorkflowTask } from './workflow';
import { LogCollector } from './log';

export interface WorkflowGlobalEnvironment {
  browser?: Browser;
  page?: Page;
  phases: Record<
    string, // phase id
    {
      inputs: Record<string, string>;
      outputs: Record<string, string>;
    }
  >;
}

export interface WorkflowTaskEnvironment<T extends WorkflowTask> {
  getInput(name: T['inputs'][number]['name']): string;
  setOutput(name: T['outputs'][number]['name'], value: string): void;

  getBrowser(): Browser | undefined;
  setBrowser(browser: Browser): void;

  getPage(): Page | undefined;
  setPage(page: Page): void;

  log: LogCollector;
}
