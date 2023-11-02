import { ChacaTreeNodeConfig } from "../../interfaces/tree.interface";
import { ChacaTreeNode } from "../ChacaTreeNode/ChacaTreeNode";
import { SchemaField } from "../../../../schemas/SchemaField";
import { TryRefANoKeyFieldError } from "../../../../errors";

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
      throw new TryRefANoKeyFieldError(this.getRouteString());
    } else {
      return false;
    }
  }

  public getValue() {
    return this.schema.getValue();
  }
}
