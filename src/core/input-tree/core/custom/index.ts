import { TryRefANoKeyFieldError } from "../../../../errors";
import { DatasetStore } from "../../../dataset-store";
import { ChacaTreeNodeConfig } from "../../interfaces/tree";
import { ChacaTreeNode } from "../node";
import { FieldIsArray } from "../../../schema/value-object";
import { CustomField } from "../../../fields/core/custom";

interface Props {
  fields: any;
  datasetStore: DatasetStore;
}

export class CustomValueNode extends ChacaTreeNode {
  constructor(config: ChacaTreeNodeConfig, private readonly func: CustomField) {
    super(config);
  }

  getNoArrayNode(): ChacaTreeNode {
    return new CustomValueNode(
      { ...this.getNodeConfig(), isArray: new FieldIsArray() },
      this.func,
    );
  }

  value({ fields, datasetStore }: Props) {
    const value = this.func({
      store: datasetStore,
      currentFields: fields,
    });

    return value;
  }

  checkIfFieldExists(fieldTreeRoute: string[]): boolean {
    if (fieldTreeRoute.length === 0) {
      throw new TryRefANoKeyFieldError(this.getRouteString());
    } else {
      return false;
    }
  }
}
