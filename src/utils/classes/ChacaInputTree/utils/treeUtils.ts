import { ChacaTreeNode, CustomValueNode } from "../classes/index.js";

export function orderFieldsByPriority(
  nodes: Array<ChacaTreeNode>,
): Array<ChacaTreeNode> {
  const normalNodes: Array<ChacaTreeNode> = [];
  const customNodes: Array<CustomValueNode> = [];

  for (const n of nodes) {
    if (n instanceof CustomValueNode) {
      customNodes.push(n);
    } else {
      normalNodes.push(n);
    }
  }

  return [...normalNodes, ...customNodes];
}
