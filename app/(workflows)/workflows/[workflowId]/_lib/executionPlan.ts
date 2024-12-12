import {
  AppNode,
  AppNodeMissingInputs,
  WorkflowExecutionPlan,
  WorkflowExecutionPlanPhase,
} from '@/types/workflow';
import { Edge, getIncomers } from '@xyflow/react';
import { TaskRegistry } from './task/registry';

export enum FlowToExecutionPlanValidationError {
  NO_ENTRY_POINT = 'NO_ENTRY_POINT',
  INVALID_INPUT = 'INVALID_INPUT',
}

export interface FlowToExecutionPlanType {
  executionPlan?: WorkflowExecutionPlan;
  errors?: {
    type: FlowToExecutionPlanValidationError;
    invalidElements?: AppNodeMissingInputs[];
  };
}
/**
 * 获取工作流的入口节点
 * @param nodes 所有节点
 * @returns 入口节点
 */
const getEntryPoint = (nodes: AppNode[]): AppNode | undefined => {
  // 查找标记为入口点的节点
  const entryPoint = nodes.find(
    (node) => TaskRegistry[node.data.type].isEntryPoint,
  );

  return entryPoint;
};

/**
 * 获取节点的无效输入
 * @param node 当前节点
 * @param edges 所有边
 * @param planned 已计划执行的节点ID集合
 * @returns 无效输入的名称数组
 */
const getInvalidInputs = (
  node: AppNode,
  edges: Edge[],
  planned: Set<string>,
) => {
  const invalidInputs = [];
  // 获取节点类型定义的输入配置
  const inputs = TaskRegistry[node.data.type].inputs;

  for (const input of inputs) {
    // 检查输入值是否已提供
    const inputValue = node.data.inputs[input.name];
    const inputValueProvided = inputValue && inputValue.length > 0;
    if (inputValueProvided) {
      continue; // 如果已提供值，跳过检查
    }

    // 获取连接到当前节点的所有边
    const incomingEdges = edges.filter((edge) => edge.target === node.id);

    // 查找是否有边连接到这个输入
    const inputLinkedToOutput = incomingEdges.find(
      (edge) => edge.targetHandle === input.name,
    );

    // 检查必要的上游节点是否全部被记录
    const requiredInputProvidedByVisitedOutput =
      input.required &&
      inputLinkedToOutput &&
      planned.has(inputLinkedToOutput.source);

    if (requiredInputProvidedByVisitedOutput) {
      continue; // 如果必需输入已由计划节点提供，跳过
    } else if (!input.required) {
      // 处理可选输入
      if (!inputLinkedToOutput) continue;
      if (inputLinkedToOutput && planned.has(inputLinkedToOutput.source)) {
        continue;
      }
    }

    // 如果输入无效，添加到列表
    invalidInputs.push(input.name);
  }

  return invalidInputs;
};

/**
 * 将流程图转换为执行计划
 * 执行计划按照依赖关系将节点分成不同的执行阶段
 * @param nodes 所有节点
 * @param edges 所有边
 * @returns 执行计划
 */
export const flowToExecutionPlan = (
  nodes: AppNode[],
  edges: Edge[],
): FlowToExecutionPlanType => {
  // 记录已计划执行的节点
  const planned = new Set<string>();
  // 初始化执行计划，第一阶段包含入口节点
  const entryPoint = getEntryPoint(nodes);
  if (!entryPoint) {
    return {
      errors: {
        type: FlowToExecutionPlanValidationError.NO_ENTRY_POINT,
      },
    };
  }

  const executionPlan: WorkflowExecutionPlan = [
    {
      phase: 1,
      nodes: [entryPoint],
    },
  ];

  planned.add(entryPoint.id);

  const inputWithErrors: AppNodeMissingInputs[] = [];
  const invalidInputs = getInvalidInputs(entryPoint, edges, planned);
  if (invalidInputs.length > 0) {
    inputWithErrors.push({
      nodeId: entryPoint.id,
      inputs: invalidInputs,
    });
  }

  // 遍历所有可能的阶段，直到所有节点都被计划
  for (
    let phase = 2;
    phase <= nodes.length && planned.size < nodes.length;
    phase++
  ) {
    const nextPhase: WorkflowExecutionPlanPhase = { phase, nodes: [] };
    for (const currentNode of nodes) {
      if (planned.has(currentNode.id)) {
        // 跳过已计划的节点
        continue;
      }

      // 检查节点的输入是否有效
      const invalidInputs = getInvalidInputs(currentNode, edges, planned);

      if (invalidInputs.length > 0) {
        // 如果有无效输入，检查所有上游节点是否都已计划
        const incomers = getIncomers(currentNode, nodes, edges);
        if (incomers.every((incomer) => planned.has(incomer.id))) {
          // 如果所有上游节点都已计划但输入仍然无效，说明配置有误
          console.error('invalid inputs', currentNode.id, invalidInputs);
          if (invalidInputs.length > 0) {
            inputWithErrors.push({
              nodeId: currentNode.id,
              inputs: invalidInputs,
            });
          }
        } else {
          // 否则跳过当前节点，等待上游节点计划完成
          continue;
        }
      }

      // 将有效的节点添加到当前阶段
      nextPhase.nodes.push(currentNode);
    }

    nextPhase.nodes.forEach((node) => planned.add(node.id));
    executionPlan.push(nextPhase);
  }

  if (inputWithErrors.length > 0) {
    return {
      errors: {
        type: FlowToExecutionPlanValidationError.INVALID_INPUT,
        invalidElements: inputWithErrors,
      },
    };
  }

  return {
    executionPlan,
  };
};
