'use client';

import { Button } from '@/components/ui/button';
import { ChevronLeftIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { SaveBtn } from './save-btn';
import { ExecuteBtn } from './execute-btn';
import { NavigationTabs } from './navigation-tabs';

export const TopBar = ({
  title,
  subTitle,
  workflowId,
  hideBtns = false,
}: {
  title: string;
  subTitle?: string;
  workflowId: string;
  hideBtns?: boolean;
}) => {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-10 flex h-[60px] w-full border-separate items-center justify-between border-b-2 bg-background p-2">
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
      <NavigationTabs workflowId={workflowId} />
      <div className="flex flex-1 justify-end gap-1">
        {!hideBtns && (
          <>
            <ExecuteBtn workflowId={workflowId} />
            <SaveBtn workflowId={workflowId} />
          </>
        )}
      </div>
    </header>
  );
};
