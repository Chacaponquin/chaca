import {
  EmptyEnumValuesError,
  TryRefANoKeyFieldError,
} from "../../../../errors";
import { ChacaUtils } from "../../../utils";
import { ChacaTreeNodeConfig } from "../../interfaces/tree";
import { ChacaTreeNode } from "../node/node";

export class EnumValueNode extends ChacaTreeNode {
  private readonly utils = new ChacaUtils();

  constructor(config: ChacaTreeNodeConfig, readonly options: unknown[]) {
    super(config);

    if (Array.isArray(options)) {
      if (options.length === 0) {
        throw new EmptyEnumValuesError(this.getRouteString());
      }
    } else {
      throw new EmptyEnumValuesError(this.getRouteString());
    }
  }

  public getValue() {
    const selectOption = this.utils.oneOfArray(this.options);
    return selectOption ? selectOption : null;
  }

  public getNoArrayNode(): ChacaTreeNode {
    return new EnumValueNode(
      { ...this.getNodeConfig(), isArray: null },
      this.options,
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
