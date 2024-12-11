import { TaskParamProps } from '../../../data';

export const BrowserInstanceParam = ({ param }: TaskParamProps) => {
  return <p className="text-xs">{param.name}</p>;
};
