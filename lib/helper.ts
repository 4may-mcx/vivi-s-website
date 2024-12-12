import { intervalToDuration } from 'date-fns';

export const waitFor = (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

export const datesToDurationString = (
  start?: Date | null,
  end?: Date | null,
) => {
  if (!start || !end) return null;

  const timeElapsed = end.getTime() - start.getTime();
  if (timeElapsed < 1000) return `${timeElapsed}ms`;

  const duration = intervalToDuration({
    start: 0,
    end: timeElapsed,
  });
  return `${duration.minutes || 0}m ${duration.seconds || 0}s`;
};
