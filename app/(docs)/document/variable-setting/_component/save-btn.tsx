'use client';

import { Button } from '@/components/ui/button';
import { useReactFlow } from '@xyflow/react';
import { CheckIcon } from 'lucide-react';

export const SaveBtn = () => {
  const { toObject } = useReactFlow();

  return (
    <Button
      variant="outline"
      className="flex items-center gap-2"
      onClick={() => {
        console.log('@FLOW', toObject());
      }}
    >
      <CheckIcon size={16} className="stroke-green-800" />
      Save
    </Button>
  );
};