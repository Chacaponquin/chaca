import { TryRefANoKeyFieldError } from "../../../../errors/ChacaError.js";
import { CustomField } from "../../../ChacaSchema/interfaces/schema.interface.js";
import { DatasetStore } from "../../../DatasetStore/DatasetStore.js";
import { ChacaTreeNodeConfig } from "../../interfaces/tree.interface.js";
import { ChacaTreeNode } from "../ChacaTreeNode/ChacaTreeNode.js";

export class CustomValueNode<C = any, R = unknown> extends ChacaTreeNode {
  constructor(
    config: ChacaTreeNodeConfig,
    private readonly func: CustomField<C, R>,
  ) {
    super(config);
  }

  public getNoArrayNode(): ChacaTreeNode {
    return new CustomValueNode<C, R>(
      { ...this.getNodeConfig(), isArray: null },
      this.func,
    );
  }

  public getValue(fields: C, datasetStore: DatasetStore): R {
    const value = this.func({
      store: datasetStore,
      currentFields: fields,
    });

    if (value === undefined) {
      return null as R;
    } else {
      return value;
    }
  }

  public checkIfFieldExists(fieldTreeRoute: string[]): boolean {
    if (fieldTreeRoute.length === 0) {
      throw new TryRefANoKeyFieldError(this.getRouteString());
    } else {
      return false;
    }
  }
}
