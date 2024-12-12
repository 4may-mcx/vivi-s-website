'use client';

import { cn } from '@/lib/utils';
import { useReactFlow } from '@xyflow/react';
import { ReactNode } from 'react';
import { useFlowValidation } from '../../_hooks/use-flow-validation';

export const NodeCard = ({
  children,
  nodeId,
  isSelected,
}: {
  children: ReactNode;
  nodeId: string;
  isSelected?: boolean;
}) => {
  const { getNode, setCenter } = useReactFlow();
  const { invalidInputs } = useFlowValidation();
  const hasInvalidInput = invalidInputs.some(
    (input) => input.nodeId === nodeId,
  );

  const handDoubleClick = () => {
    const node = getNode(nodeId);
    if (!node) return;

    const { position, measured } = node;
    if (!position || !measured) return;

    const { x: _x, y: _y } = position;
    const { width, height } = measured;

    const x = _x + width! / 2;
    const y = _y + height! / 2;

    if (x === undefined || y === undefined) return;

    setCenter(x, y, {
      zoom: 1,
      duration: 500,
    });
  };
  return (
    <div
      onDoubleClick={handDoubleClick}
      className={cn(
        'flex w-[420px] border-separate cursor-pointer flex-col gap-1 rounded-md border-2 bg-background text-xs',
        isSelected && 'border-primary',
        hasInvalidInput && 'border-2 border-destructive',
      )}
    >
      {children}
    </div>
  );
};
