import { ChacaTreeNodeConfig } from "../../interfaces/tree";
import { ChacaTreeNode } from "../node";
import { TryRefANoKeyFieldError } from "../../../../errors";
import { KeyValueNode } from "../key";

export class MixedValueNode extends ChacaTreeNode {
  private nodes: ChacaTreeNode[] = [];

  constructor(config: ChacaTreeNodeConfig) {
    super(config);
  }

  getFields() {
    return this.nodes;
  }

  getNoArrayNode(): ChacaTreeNode {
    return new MixedValueNode({ ...this.getNodeConfig(), isArray: null });
  }

  getPossibleNullNodes(): ChacaTreeNode[] {
    const nodes = [] as ChacaTreeNode[];

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

  getKeyFields(): KeyValueNode[] {
    const keys = [] as KeyValueNode[];

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

  insertNode(node: ChacaTreeNode): void {
    this.nodes.push(node);
  }

  checkIfFieldExists(fieldTreeRoute: string[]): boolean {
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
