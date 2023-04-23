import { SchemaField } from "../../../../../schemas/SchemaField.js";
import { ChacaTreeNode } from "../ChacaTreeNode/ChacaTreeNode.js";

export class KeyValueNode extends ChacaTreeNode {
  constructor(
    name: string,
    private readonly fieldFunction: SchemaField<string | number>,
  ) {
    super({ name, isArray: null, posibleNull: 0 });
  }

  public getNoArrayNode(): ChacaTreeNode {
    return new KeyValueNode(this.nodeConfig.name, this.fieldFunction);
  }

  public checkIfFieldExists(fieldTreeRoute: string[]): boolean {
    return fieldTreeRoute.length === 0;
  }

  public getValue() {
    return this.fieldFunction.getValue();
  }
}
