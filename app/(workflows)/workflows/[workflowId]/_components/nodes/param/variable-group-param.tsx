'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { TaskParamProps } from '@/types/workflow';
import { ReactNode, useEffect, useId, useState } from 'react';

export const VariableGroupParam = ({
  param,
  value,
  updateNodeParamValue,
  disabled,
}: TaskParamProps) => {
  const [internalValue, setInternalValue] = useState(value ?? '');
  const id = useId();

  useEffect(() => {
    setInternalValue(value ?? '');
  }, [value]);

  const placeholder = disabled ? '' : '请在这里输入';
  let Component: ReactNode = (
    <Input
      id={id}
      value={internalValue}
      onChange={(e) => setInternalValue(e.target.value)}
      onBlur={(e) => updateNodeParamValue?.(e.target.value)}
      placeholder={placeholder}
      className="text-xs"
      disabled={disabled}
    />
  );

  if (param.variant === 'textarea') {
    Component = (
      <Textarea
        id={id}
        value={internalValue}
        onChange={(e) => setInternalValue(e.target.value)}
        onBlur={(e) => updateNodeParamValue?.(e.target.value)}
        placeholder={placeholder}
        className="text-xs"
        disabled={disabled}
      />
    );
  }

  return (
    <div className="w-full space-y-1 p-1">
      <Label htmlFor={id} className="flex text-xs">
        {param.name}
        {param.required && <p className="px-2 text-red-400">*</p>}
      </Label>
      {Component}
      {param.helperText && (
        <p className="px-2 text-muted-foreground">{param.helperText}</p>
      )}
    </div>
  );
};
