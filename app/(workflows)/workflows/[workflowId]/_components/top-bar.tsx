'use client';

import { Button } from '@/components/ui/button';
import { ChevronLeftIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { SaveBtn } from './save-btn';

export const TopBar = ({
  title,
  subTitle,
  workflowId,
}: {
  title: string;
  subTitle?: string;
  workflowId: string;
}) => {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-10 flex h-[60px] w-full border-separate justify-between border-pink-200 bg-background p-2">
      <div className="flex flex-1 gap-1">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ChevronLeftIcon size={32} />
        </Button>
        <div>
          <p className="truncate text-ellipsis font-bold">{title}</p>
          {subTitle && (
            <p className="truncate text-ellipsis text-xs text-muted-foreground">
              {subTitle}
            </p>
          )}
        </div>
      </div>
      <SaveBtn workflowId={workflowId} />
    </header>
  );
};