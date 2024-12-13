import { Log, LogCollector } from '@/types/workflow';

export const createLogCollector = (): LogCollector => {
  const logs: Log[] = [];

  return {
    getAll: () => logs,
    info: (message: string) => {
      logs.push({ level: 'info', message, timestamp: new Date() });
    },
    error: (message: string) => {
      logs.push({ level: 'error', message, timestamp: new Date() });
    },
    warning: (message: string) => {
      logs.push({ level: 'warning', message, timestamp: new Date() });
    },
  };
};
