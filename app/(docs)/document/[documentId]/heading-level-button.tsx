'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { useEditorStore } from '@/src/store/use-editor-store';
import { type Level } from '@tiptap/extension-heading';
import { ChevronDownIcon } from 'lucide-react';

export const HeadingLevelButton = () => {
  const { editor } = useEditorStore();
  const headings = [
    {
      label: 'Normal Text',
      value: 0,
      fontSize: '16px',
    },
    {
      label: 'Heading 1',
      value: 1,
      fontSize: '32px',
    },
    {
      label: 'Heading 2',
      value: 2,
      fontSize: '24px',
    },
    {
      label: 'Heading 3',
      value: 3,
      fontSize: '20px',
    },
    {
      label: 'Heading 4',
      value: 4,
      fontSize: '18px',
    },
    {
      label: 'Heading 5',
      value: 5,
      fontSize: '16px',
    },
  ];

  const getCurrentHeading = () => {
    for (let level = 1; level <= 5; level++) {
      if (editor?.isActive('heading', { level })) {
        return `Heading ${level}`;
      }
    }
    return 'Normal Text';
  };

  const handleHeadingClick = (value: number) => {
    value === 0
      ? editor?.chain().focus().setParagraph().run()
      : editor
          ?.chain()
          .focus()
          .setHeading({ level: value as Level })
          .run();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            'flex h-7 min-w-7 shrink-0 items-center justify-center overflow-hidden rounded-sm px-1.5 text-sm hover:bg-neutral-200/80',
          )}
        >
          <span className="truncate">{getCurrentHeading()}</span>
          <ChevronDownIcon className="ml-2 size-4 shrink-0" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col gap-y-1 p-1">
        {headings.map(({ label, value, fontSize }) => (
          <button
            key={value}
            onClick={() => handleHeadingClick(value)}
            className={cn(
              'flex items-center gap-x-2 rounded-sm px-2 py-1 hover:bg-neutral-200/80',
              (value === 0 && !editor?.isActive('heading')) ||
                (editor?.isActive('heading', { level: value }) &&
                  'bg-neutral-200/80'),
            )}
          >
            <span style={{ fontSize }}>{label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
