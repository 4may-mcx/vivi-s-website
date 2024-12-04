'use client';

import { cn } from '@/lib/utils';
import { useEditorStore } from '@/src/store/use-editor-store';
import {
  BoldIcon,
  LucideIcon,
  PrinterIcon,
  Redo2Icon,
  SpellCheckIcon,
  Undo2Icon,
} from 'lucide-react';
import { useMemo } from 'react';

interface ToolbarButtonProps {
  onClick?: () => void;
  isActive?: boolean;
  icon: LucideIcon;
}

const ToolbarButton = ({
  onClick,
  isActive,
  icon: Icon,
}: ToolbarButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex h-7 min-w-7 items-center justify-center rounded-sm text-sm hover:bg-neutral-200/80',
        isActive && 'bg-neutral-200/80',
      )}
    >
      <Icon className="size-4" />
    </button>
  );
};

export const Toolbar = () => {
  const { editor } = useEditorStore();

  const sections = useMemo<
    {
      label: string;
      icon: LucideIcon;
      onClick: () => void;
      isActive?: boolean;
    }[][]
  >(() => {
    return [
      [
        {
          label: 'Undo',
          icon: Undo2Icon,
          onClick: () => editor?.chain().focus().undo().run(),
          isActive: false,
        },
        {
          label: 'Redo',
          icon: Redo2Icon,
          onClick: () => editor?.chain().focus().redo().run(),
          isActive: false,
        },
        {
          label: 'Print',
          icon: PrinterIcon,
          onClick: () => window.print(),
          isActive: false,
        },
        {
          label: 'Spell Check',
          icon: SpellCheckIcon,
          onClick: () => {
            const current = editor?.view.dom.getAttribute('spellcheck');
            editor?.view.dom.setAttribute(
              'spellcheck',
              current === 'false' ? 'true' : 'false',
            );
          },
          isActive: false,
        },
      ],
      [
        {
          label: 'Bold',
          icon: BoldIcon,
          onClick: () => editor?.chain().focus().toggleBold().run(),
          isActive: false,
        },
      ],
    ];
  }, [editor]);

  return (
    <div className="flex min-h-[40px] items-center gap-x-0.5 overflow-x-auto rounded-[24px] bg-[#F1F4F9] px-2.5 py-0.5">
      {sections[0].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
    </div>
  );
};
