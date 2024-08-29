import { TryRefANoKeyFieldError } from "../../../../errors";
import { CustomField } from "../../../schema/interfaces/schema";
import { DatasetStore } from "../../../dataset-store";
import { ChacaTreeNodeConfig } from "../../interfaces/tree";
import { ChacaTreeNode } from "../node/node";

interface Props<C> {
  fields: C;
  datasetStore: DatasetStore;
}

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

  public getValue({ fields, datasetStore }: Props<C>): R {
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
