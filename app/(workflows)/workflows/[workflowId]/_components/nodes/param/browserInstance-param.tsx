import { TaskParamProps } from '@/types/workflow';

export const BrowserInstanceParam = ({ param }: TaskParamProps) => {
  return <p className="text-xs">{param.name}</p>;
};
