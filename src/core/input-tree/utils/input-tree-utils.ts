import {
  ChacaTreeNode,
  CustomValueNode,
  KeyValueNode,
  RefValueNode,
} from "../core";

export class InputTreeUtils {
  orderNodesByPriority(nodes: ChacaTreeNode[]): ChacaTreeNode[] {
    const normalNodes: ChacaTreeNode[] = [];
    const customNodes: CustomValueNode[] = [];
    const refNodes: RefValueNode[] = [];
    const keyNodes: KeyValueNode[] = [];

    for (const n of nodes) {
      if (n instanceof CustomValueNode) {
        customNodes.push(n);
      } else if (n instanceof RefValueNode) {
        refNodes.push(n);
      } else if (n instanceof KeyValueNode) {
        keyNodes.push(n);
      } else {
        normalNodes.push(n);
      }
    }

    return [...normalNodes, ...keyNodes, ...refNodes, ...customNodes];
  }
}
