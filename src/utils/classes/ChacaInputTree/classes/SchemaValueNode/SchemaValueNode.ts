import { ChacaTreeNodeConfig } from "../../interfaces/tree.interface.js";
import { ChacaTreeNode } from "../ChacaTreeNode/ChacaTreeNode.js";
import { SchemaField } from "../../../../../schemas/SchemaField.js";

export class SchemaValueNode extends ChacaTreeNode {
  constructor(
    config: ChacaTreeNodeConfig,
    public readonly schema: SchemaField,
  ) {
    super(config);
  }

  public getNoArrayNode(): ChacaTreeNode {
    return new SchemaValueNode(
      { ...this.nodeConfig, isArray: null },
      this.schema,
    );
  }
}
