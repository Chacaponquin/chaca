import { TryRefANoKeyFieldError } from "../../../../errors";
import { CustomField } from "../../../schema/interfaces/schema";
import { DatasetStore } from "../../../dataset-store";
import { ChacaTreeNodeConfig } from "../../interfaces/tree";
import { ChacaTreeNode } from "../node";

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
      { ...this.getNodeConfig(), isArray: null },
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
