import { ChacaTreeNodeConfig } from "../../interfaces/tree.interface";
import { ChacaTreeNode } from "../ChacaTreeNode/ChacaTreeNode";
import { InputTreeUtils } from "../../utils/input_tree_utils";
import { TryRefANoKeyFieldError } from "../../../../errors";
import { KeyValueNode } from "../KeyValueNode/KeyValueNode";

export class MixedValueNode extends ChacaTreeNode {
  private nodes: Array<ChacaTreeNode> = [];

  constructor(
    config: ChacaTreeNodeConfig,
    private readonly treeUtils: InputTreeUtils,
  ) {
    super(config);
  }

  public getFields() {
    return this.nodes;
  }

  public getNoArrayNode(): ChacaTreeNode {
    return new MixedValueNode(
      { ...this.getNodeConfig(), isArray: null },
      this.treeUtils,
    );
  }

  public getPossibleNullNodes(): Array<ChacaTreeNode> {
    const nodes = [] as Array<ChacaTreeNode>;

    this.nodes.forEach((n) => {
      if (n.isPossibleNull()) {
        nodes.push(n);
      }

      if (n instanceof MixedValueNode) {
        const subNodes = n.getPossibleNullNodes();
        subNodes.forEach((s) => nodes.push(s));
      }
    });

    return nodes;
  }

  public getKeyFields(): Array<KeyValueNode> {
    const keys = [] as Array<KeyValueNode>;

    this.nodes.forEach((n) => {
      if (n instanceof MixedValueNode) {
        const subKeys = n.getKeyFields();
        subKeys.forEach((k) => keys.push(k));
      } else if (n instanceof KeyValueNode) {
        keys.push(n);
      }
    });

    return keys;
  }

  public insertNode(node: ChacaTreeNode): void {
    this.nodes.push(node);
    this.treeUtils.orderNodesByPriority(this.nodes);
  }

  public checkIfFieldExists(fieldTreeRoute: string[]): boolean {
    if (fieldTreeRoute.length === 0) {
      throw new TryRefANoKeyFieldError(this.getRouteString());
    } else {
      let found = false;
      for (let i = 0; i < this.nodes.length && !found; i++) {
        if (this.nodes[i].getNodeName() === fieldTreeRoute[0]) {
          const routeWithoutFirstElement = fieldTreeRoute.slice(1);
          found = this.nodes[i].checkIfFieldExists(routeWithoutFirstElement);
        }
      }

      return found;
    }
  }
}
