import {
  ChacaTreeNode,
  CustomValueNode,
  KeyValueNode,
  RefValueNode,
} from "../classes";

export class InputTreeUtils {
  public orderNodesByPriority(nodes: ChacaTreeNode[]): ChacaTreeNode[] {
    const normalNodes: Array<ChacaTreeNode> = [];
    const customNodes: Array<CustomValueNode> = [];
    const refNodes: Array<RefValueNode> = [];
    const keyNodes: Array<KeyValueNode> = [];

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
