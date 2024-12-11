'use client';

import { Button } from '@/components/ui/button';
import {
  BaseEdge,
  EdgeLabelRenderer,
  EdgeProps,
  getSmoothStepPath,
  useReactFlow,
} from '@xyflow/react';
import { XIcon } from 'lucide-react';

export const DeletableEdge = (props: EdgeProps) => {
  const [edgePath, labelX, labelY] = getSmoothStepPath(props);
  const { setEdges } = useReactFlow();

  const handleDeleteEdge = () => {
    setEdges((eds) => eds.filter((e) => e.id !== props.id));
  };

  return (
    <>
      <BaseEdge
        path={edgePath}
        markerEnd={props.markerEnd}
        style={props.style}
      />
      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            pointerEvents: 'all',
          }}
        >
          <Button
            variant="outline"
            size="icon"
            className="h-5 w-5 cursor-pointer rounded-full border text-xs leading-none hover:shadow-lg"
            onClick={handleDeleteEdge}
          >
            <XIcon />
          </Button>
        </div>
      </EdgeLabelRenderer>
    </>
  );
};
