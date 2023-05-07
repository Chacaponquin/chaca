import { ChacaTreeNode } from "../ChacaTreeNode/ChacaTreeNode.js";
import { RefValueNode } from "../RefValueNode/RefValueNode.js";
import { SchemaValueNode } from "../SchemaValueNode/SchemaValueNode.js";

export type KeyValueNodeProps = RefValueNode | SchemaValueNode;

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
    return this.fieldNode.getValue();
  }
}
