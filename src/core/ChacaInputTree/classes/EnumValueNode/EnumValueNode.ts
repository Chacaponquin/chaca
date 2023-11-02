import {
  EmptyEnumValuesError,
  TryRefANoKeyFieldError,
} from "../../../../errors";
import { ChacaUtils } from "../../../ChacaUtils/ChacaUtils";
import { ChacaTreeNodeConfig } from "../../interfaces/tree.interface";
import { ChacaTreeNode } from "../ChacaTreeNode/ChacaTreeNode";

export class EnumValueNode extends ChacaTreeNode {
  constructor(
    config: ChacaTreeNodeConfig,
    public readonly enumOptions: Array<unknown>,
  ) {
    super(config);

    if (Array.isArray(enumOptions)) {
      if (enumOptions.length === 0) {
        throw new EmptyEnumValuesError(this.getRouteString());
      }
    } else {
      throw new EmptyEnumValuesError(this.getRouteString());
    }
  }

  public getValue() {
    const selectOption = new ChacaUtils().oneOfArray(this.enumOptions);
    return selectOption ? selectOption : null;
  }

  public getNoArrayNode(): ChacaTreeNode {
    return new EnumValueNode(
      { ...this.getNodeConfig(), isArray: null },
      this.enumOptions,
    );
  }

  public checkIfFieldExists(fieldTreeRoute: string[]): boolean {
    if (fieldTreeRoute.length === 0) {
      throw new TryRefANoKeyFieldError(this.getRouteString());
    } else {
      return false;
    }
  }
}
