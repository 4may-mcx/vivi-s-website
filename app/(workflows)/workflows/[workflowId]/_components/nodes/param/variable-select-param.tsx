'use client';

import { GetVariableGroupBySubject } from '@/actions/mock/getVariableGroupBySubject';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SubjectType } from '@/types/fake';
import {
  TaskOutputParamType,
  TaskParamProps,
  TaskParamType,
} from '@/types/workflow';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useNodeTaskContext } from '../../../_context/node-task.context';

export const VariableSelectParam = ({
  param,
  value,
  updateNodeParamValue,
  disabled,
}: TaskParamProps) => {
  const { setTask } = useNodeTaskContext();
  const [internalValue, setInternalValue] = useState(value ?? '');

  const query = useQuery({
    queryKey: ['execution', value],
    queryFn: () => GetVariableGroupBySubject(value),
  });

  useEffect(() => {
    setTask((task) => {
      const outputs = Object.values(query.data ?? {}).map((i) => ({
        type: TaskParamType.STRING,
        name: i.label,
        value: i.value,
      })) as TaskOutputParamType[];

      return {
        ...task,
        outputs,
      };
    });
    setInternalValue(value ?? '');
  }, [value, setTask, query.data]);

  return (
    <div className="w-full space-y-1 p-1">
      <Select
        value={internalValue}
        onValueChange={updateNodeParamValue}
        disabled={disabled}
      >
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="请选择" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={SubjectType.English}>英语</SelectItem>
          <SelectItem value={SubjectType.Chinese}>语文</SelectItem>
          <SelectItem value={SubjectType.Math}>数学</SelectItem>
        </SelectContent>
      </Select>
      {param.helperText && (
        <p className="px-2 py-1 text-muted-foreground">{param.helperText}</p>
      )}
      <pre>{JSON.stringify(query.data, null, 2)}</pre>
    </div>
  );
};
