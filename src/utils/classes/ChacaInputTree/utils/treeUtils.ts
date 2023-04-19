import {
  ChacaTreeNode,
  CustomValueNode,
  RefValueNode,
} from "../classes/index.js";

export function orderFieldsByPriority(
  nodes: Array<ChacaTreeNode>,
): Array<ChacaTreeNode> {
  const normalNodes: Array<ChacaTreeNode> = [];
  const customNodes: Array<CustomValueNode> = [];
  const refNodes: Array<RefValueNode> = [];

  for (const n of nodes) {
    if (n instanceof CustomValueNode) {
      customNodes.push(n);
    } else if (n instanceof RefValueNode) {
      refNodes.push(n);
    } else {
      normalNodes.push(n);
    }
  }

  return [...normalNodes, ...refNodes, ...customNodes];
}
