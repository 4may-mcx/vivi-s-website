import { Input } from '@/components/ui/input';
import { TaskInputParamType, TaskParamType } from '../../data';

export const NodeParamField = ({ param }: { param: TaskInputParamType }) => {
  switch (param.type) {
    case TaskParamType.STRING:
      return <Input />;
    default:
      return (
        <div className="w-full">
          <p className="text-xs text-muted-foreground">Not implemented</p>
        </div>
      );
  }
};
