import { TryRefANoKeyFieldError } from "../../../../../errors/ChacaError.js";
import { CustomField } from "../../../../interfaces/schema.interface.js";
import { DocumentTree } from "../../../ChacaResultTree/classes/index.js";
import { DatasetStore } from "../../../DatasetStore/DatasetStore.js";
import { SchemaData } from "../../../SchemaData/SchemaData.js";
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
      { ...this.getNodeConfig(), isArray: null },
      this.valueFunction,
    );
  }

  public getValue(
    fields: C,
    datasetStore: DatasetStore,
    restDocuments: Array<DocumentTree<C>>,
  ): R {
    const value = this.valueFunction({
      store: datasetStore,
      currentFields: fields,
      schemaRestDocuments: new SchemaData(restDocuments),
    });

    if (value === undefined) {
      return null as R;
    } else {
      return value;
    }
  }

  public checkIfFieldExists(fieldTreeRoute: string[]): boolean {
    if (fieldTreeRoute.length === 0) {
      throw new TryRefANoKeyFieldError(this.getNodeConfig().fieldTreeRoute);
    } else {
      return false;
    }
  }
}
