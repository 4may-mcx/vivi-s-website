export const LogLevels = ['info', 'error', 'warning'] as const;
export type LogLevel = (typeof LogLevels)[number];

export interface Log {
  level: LogLevel;
  message: string;
  timestamp: Date;
}

export type LogFunction = (message: string) => void;

export type LogCollector = {
  getAll(): Log[];
} & {
  [K in LogLevel]: LogFunction;
};