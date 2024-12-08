'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useId, useState } from 'react';
import { TaskParamProps } from '../../../data';

export const StringParam = ({
  param,
  value,
  updateNodeParamValue,
}: TaskParamProps) => {
  const [internalValue, setInternalValue] = useState(value ?? '');
  const id = useId();

  return (
    <div className="w-full space-y-1 p-1">
      <Label htmlFor={id} className="flex text-xs">
        {param.name}
        {param.required && <p className="px-2 text-red-400">*</p>}
      </Label>
      <Input
        id={id}
        value={internalValue}
        onChange={(e) => setInternalValue(e.target.value)}
        onBlur={(e) => updateNodeParamValue(e.target.value)}
        placeholder="请在这里输入"
        className="text-xs"
      />
      {param.helperText && (
        <p className="px-2 text-muted-foreground">{param.helperText}</p>
      )}
    </div>
  );
};
