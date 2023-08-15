import { ChacaTreeNodeConfig } from "../../interfaces/tree.interface.js";
import { ChacaTreeNode } from "../ChacaTreeNode/ChacaTreeNode.js";
import { SchemaField } from "../../../../schemas/SchemaField.js";
import { TryRefANoKeyFieldError } from "../../../../errors/ChacaError.js";

export class SchemaValueNode extends ChacaTreeNode {
  constructor(
    config: ChacaTreeNodeConfig,
    private readonly schema: SchemaField,
  ) {
    super(config);
  }

  public getNoArrayNode(): ChacaTreeNode {
    return new SchemaValueNode(
      { ...this.getNodeConfig(), isArray: null },
      this.schema,
    );
  }

  public checkIfFieldExists(fieldTreeRoute: string[]): boolean {
    if (fieldTreeRoute.length === 0) {
      throw new TryRefANoKeyFieldError(this.getNodeConfig().fieldTreeRoute);
    } else {
      return false;
    }
  }

  public getValue() {
    return this.schema.getValue();
  }
}
