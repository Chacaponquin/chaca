import { ChacaTreeNodeConfig } from "../../interfaces/tree.interface.js";
import { ChacaTreeNode } from "../ChacaTreeNode/ChacaTreeNode.js";

export class MixedValueNode extends ChacaTreeNode {
  private nodes: Array<ChacaTreeNode> = [];

  constructor(config: ChacaTreeNodeConfig) {
    super(config);
  }

  public getNoArrayNode(): ChacaTreeNode {
    return new MixedValueNode({ ...this.nodeConfig, isArray: null });
  }

  public insertNode(node: ChacaTreeNode): void {
    this.nodes.push(node);
  }
}
