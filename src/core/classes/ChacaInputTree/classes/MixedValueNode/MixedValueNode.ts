import { ChacaTreeNodeConfig } from "../../interfaces/tree.interface.js";
import { ChacaTreeNode } from "../ChacaTreeNode/ChacaTreeNode.js";
import { orderFieldsByPriority } from "../../utils/treeUtils.js";

export class MixedValueNode extends ChacaTreeNode {
  private nodes: Array<ChacaTreeNode> = [];

  constructor(config: ChacaTreeNodeConfig) {
    super(config);
  }

  public getFields() {
    return this.nodes;
  }

  public getNoArrayNode(): ChacaTreeNode {
    return new MixedValueNode({ ...this.nodeConfig, isArray: null });
  }

  public insertNode(node: ChacaTreeNode): void {
    this.nodes.push(node);
    orderFieldsByPriority(this.nodes);
  }

  public checkIfFieldExists(fieldTreeRoute: string[]): boolean {
    if (fieldTreeRoute.length === 0) {
      return true;
    } else {
      let found = false;
      for (let i = 0; i < this.nodes.length && !found; i++) {
        if (this.nodes[i].nodeConfig.name === fieldTreeRoute[0]) {
          const routeWithoutFirstElement = fieldTreeRoute.slice(1);
          found = this.nodes[i].checkIfFieldExists(routeWithoutFirstElement);
        }
      }

      return found;
    }
  }
}
