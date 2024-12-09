'use client';

import { DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

export const CustomDialogHeader = ({
  icon: Icon,
  title,
  subTitle,
  titleClassName,
  subTitleClassName,
  iconClassName,
}: {
  icon?: LucideIcon;
  title?: string;
  subTitle?: string;
  iconClassName?: string;
  titleClassName?: string;
  subTitleClassName?: string;
}) => {
  return (
    <DialogHeader className="py-6">
      <DialogTitle asChild>
        <div className="mb-2 flex flex-col items-center gap-2">
          {Icon && (
            <Icon size={30} className={cn('stroke-primary', iconClassName)} />
          )}
          {title && (
            <p className={cn('text-xl text-primary', titleClassName)}>
              {title}
            </p>
          )}
          {subTitle && (
            <p
              className={cn('text-sm text-muted-foreground', subTitleClassName)}
            >
              {subTitle}
            </p>
          )}
        </div>
      </DialogTitle>
    </DialogHeader>
  );
};
