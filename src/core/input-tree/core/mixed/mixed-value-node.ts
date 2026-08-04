import { InputTreeNode } from "../node/input-tree-node";
import { TryRefANoKeyFieldError } from "../../../../errors";
import { KeyValueNode } from "../key/key-value-node";
import { IsArray, NotArray } from "../is-array/is-array";
import { NodeRoute } from "../node/value-object/route";
import { NotNull, PossibleNull } from "../possible-null/possible-null";
import { MixedFieldNode } from "../../../result-tree/classes/mixed";
import { FieldNode } from "../../../result-tree/classes/node/field-node";

export class MixedValueNode extends InputTreeNode {
  private nodes: InputTreeNode[] = [];

  constructor(route: NodeRoute, isArray: IsArray, possibleNull: PossibleNull) {
    super(route, isArray, possibleNull);
  }

  getFields() {
    return this.nodes;
  }

  /**
   * Los elementos de un array no son campos, por lo que no llevan la
   * configuracion de nulos del campo: `possibleNull` decide si el valor del
   * campo es un array o `null`, no si cada elemento lo es.
   */
  getNoArrayNode(): InputTreeNode {
    const node = new MixedValueNode(this.route, new NotArray(), new NotNull());
    node.nodes = this.nodes;

    return node;
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
        if (this.nodes[i].getName() === fieldTreeRoute[0]) {
          const routeWithoutFirstElement = fieldTreeRoute.slice(1);

          found = this.nodes[i].checkIfFieldExists(routeWithoutFirstElement);
        }
      }

      return found;
    }
  }

  generate(): Promise<FieldNode> {
    const result = new MixedFieldNode(this.getName());

    return new Promise((resolve) => resolve(result));
  }
}
