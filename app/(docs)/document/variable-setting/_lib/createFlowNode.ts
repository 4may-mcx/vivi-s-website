import { AppNode, TaskType } from '../data';

let ID_COUNT = 0;
const generateNodeId = (nodeType: TaskType) =>
  `$$__${nodeType}_${ID_COUNT++}__$$`;

export const createFlowNode = (
  nodeType: TaskType,
  position?: { x: number; y: number },
): AppNode => {
  return {
    id: generateNodeId(nodeType),
    position: position ?? { x: 0, y: 0 },
    type: 'FlowScrapeNode',
    data: {
      type: nodeType,
      inputs: {},
    },
  };
};
