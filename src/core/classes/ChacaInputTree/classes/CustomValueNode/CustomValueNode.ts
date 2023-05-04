import { TryRefANoKeyFieldError } from "../../../../../errors/ChacaError.js";
import { CustomField } from "../../../../interfaces/schema.interface.js";
import { SchemaStore } from "../../../SchemasStore/SchemaStore.js";
import { ChacaTreeNodeConfig } from "../../interfaces/tree.interface.js";
import { ChacaTreeNode } from "../ChacaTreeNode/ChacaTreeNode.js";

export class CustomValueNode<C = any, R = unknown> extends ChacaTreeNode {
  constructor(
    config: ChacaTreeNodeConfig,
    private readonly valueFunction: CustomField<C, R>,
  ) {
    super(config);
  }

  public getNoArrayNode(): ChacaTreeNode {
    return new CustomValueNode<C, R>(
      { ...this.nodeConfig, isArray: null },
      this.valueFunction,
    );
  }

  public getValue(fields: C, schemaStore: SchemaStore): R {
    const value = this.valueFunction(fields, schemaStore);

    if (value === undefined) {
      return null as R;
    } else {
      return value;
    }
  }

  public checkIfFieldExists(fieldTreeRoute: string[]): boolean {
    if (fieldTreeRoute.length === 0) {
      throw new TryRefANoKeyFieldError(this.nodeConfig.name);
    } else {
      return false;
    }
  }
}
