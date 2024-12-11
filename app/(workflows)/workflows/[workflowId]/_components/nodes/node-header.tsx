import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AppNode, TaskType } from '@/types/workflow';
import { useReactFlow } from '@xyflow/react';
import { CopyIcon, GripVerticalIcon, TrashIcon } from 'lucide-react';
import { createFlowNode } from '../../_lib/createFlowNode';
import { TaskRegistry } from '../../_lib/task/registry';

const COPY_OFFSET = 140;

export const NodeHeader = ({
  taskType,
  nodeId,
}: {
  taskType: TaskType;
  nodeId: string;
}) => {
  const { deleteElements, getNode, addNodes } = useReactFlow();
  const task = TaskRegistry[taskType];

  const handleDeleteNode = () => {
    deleteElements({
      nodes: [{ id: nodeId }],
    });
  };

  const handleCopyNode = () => {
    const node = getNode(nodeId) as AppNode;

    const newNode = createFlowNode(node.data.type, {
      x: node.position.x + COPY_OFFSET,
      y: node.position.y + COPY_OFFSET,
    });

    addNodes([newNode]);
  };

  return (
    <div className="flex items-center gap-2 p-2">
      <task.icon size={16} />
      <div className="flex w-full items-center justify-between">
        <p className="text-xs font-bold uppercase text-muted-foreground">
          {task.label}
        </p>
        <div className="flex items-center gap-1">
          {task.isEntryPoint ? (
            <Badge>Entry point</Badge>
          ) : (
            <>
              <Button variant="ghost" size="icon" onClick={handleDeleteNode}>
                <TrashIcon />
              </Button>
              <Button variant="ghost" size="icon" onClick={handleCopyNode}>
                <CopyIcon />
              </Button>
            </>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="drag-handle cursor-grab"
          >
            <GripVerticalIcon />
          </Button>
        </div>
      </div>
    </div>
  );
};
