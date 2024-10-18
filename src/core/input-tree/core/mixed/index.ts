import { InputTreeNode } from "../node";
import { TryRefANoKeyFieldError } from "../../../../errors";
import { KeyValueNode } from "../key";
import { IsArray, NotArray } from "../is-array";
import { FieldNode, MixedFieldNode } from "../../../result-tree/classes";
import { NodeRoute } from "../node/value-object/route";
import { PossibleNull } from "../possible-null";

export class MixedValueNode extends InputTreeNode {
  private nodes: InputTreeNode[] = [];

  constructor(route: NodeRoute, isArray: IsArray, possibleNull: PossibleNull) {
    super(route, isArray, possibleNull);
  }

  getFields() {
    return this.nodes;
  }

  getNoArrayNode(): InputTreeNode {
    return new MixedValueNode(this.route, new NotArray(), this.possibleNull);
  }

  getPossibleNullNodes(): InputTreeNode[] {
    const nodes = [] as InputTreeNode[];

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

  insertNode(node: InputTreeNode): void {
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

  generate(): FieldNode {
    return new MixedFieldNode(this.getNodeName());
  }
}
