'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { TaskType } from '@/types/workflow';
import { TaskRegistry } from '../_lib/task/registry';

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
        defaultValue={['extraction', 'variable']}
      >
        <AccordionItem value="extraction">
          <AccordionTrigger className="font-bold">
            Data extraction
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-1">
            <TaskMenuBtn taskType={TaskType.PAGE_TO_HTML} />
            <TaskMenuBtn taskType={TaskType.EXTRACT_TEXT_FROM_ELEMENT} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="variable">
          <AccordionTrigger className="font-bold">
            Variable Calculate
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-1">
            <TaskMenuBtn taskType={TaskType.VARIABLE_GROUP} />
            <TaskMenuBtn taskType={TaskType.VARIABLE_CALC} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </aside>
  );
};
