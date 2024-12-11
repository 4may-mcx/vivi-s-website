'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { TaskType } from '../data';
import { TaskRegistry } from '../_lib/task/registry';
import { Button } from '@/components/ui/button';

const TaskMenuBtn = ({ taskType }: { taskType: TaskType }) => {
  const task = TaskRegistry[taskType];

  const onDragStart = (
    event: React.DragEvent<HTMLButtonElement>,
    type: TaskType,
  ) => {
    event.dataTransfer.setData('application/reactflow', type);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <Button
      variant="secondary"
      draggable
      onDragStart={(event) => onDragStart(event, taskType)}
      className="flex w-full items-center justify-center gap-2 border"
    >
      <task.icon size={20} />
      {task.label}
    </Button>
  );
};

export const TaskMenu = () => {
  return (
    <aside className="h-full w-[320px] min-w-[300px] max-w-[340px] overflow-auto border-r-2 p-2 px-4">
      <Accordion
        type="multiple"
        className="w-full"
        defaultValue={['extraction']}
      >
        <AccordionItem value="extraction">
          <AccordionTrigger className="font-bold">
            Data extraction
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-1">
            <TaskMenuBtn taskType={TaskType.PAGE_TO_HTML} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </aside>
  );
};