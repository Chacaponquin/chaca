import { ChacaTreeNode } from "../ChacaTreeNode/ChacaTreeNode.js";
import { RefValueNode } from "../RefValueNode/RefValueNode.js";
import { SchemaValueNode } from "../SchemaValueNode/SchemaValueNode.js";
import { SequenceValueNode } from "../SequenceValueNode/SequenceValueNode.js";

export type KeyValueNodeProps =
  | RefValueNode
  | SchemaValueNode
  | SequenceValueNode;

export class KeyValueNode extends ChacaTreeNode {
  constructor(
    fieldTreeRoute: Array<string>,
    private readonly fieldNode: KeyValueNodeProps,
  ) {
    super({ fieldTreeRoute, isArray: null, posibleNull: 0 });
  }

  public getNoArrayNode(): ChacaTreeNode {
    return new KeyValueNode(
      this.getNodeConfig().fieldTreeRoute,
      this.fieldNode,
    );
  }

  public checkIfFieldExists(fieldTreeRoute: string[]): boolean {
    return fieldTreeRoute.length === 0;
  }

  public getValue() {
    if (this.fieldNode instanceof RefValueNode) {
      return this.fieldNode.getValue();
    } else if (this.fieldNode instanceof SchemaValueNode) {
      return this.fieldNode.getValue();
    } else {
      return this.fieldNode.getNextValue();
    }
  }
}
