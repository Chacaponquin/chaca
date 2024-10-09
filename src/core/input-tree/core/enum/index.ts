import {
  EmptyEnumValuesError,
  TryRefANoKeyFieldError,
} from "../../../../errors";
import { FieldIsArray } from "../../../schema/value-object";
import { ChacaUtils } from "../../../utils";
import { ChacaTreeNodeConfig } from "../../interfaces/tree";
import { ChacaTreeNode } from "../node";

export class EnumValueNode extends ChacaTreeNode {
  private readonly utils = new ChacaUtils();

  constructor(
    config: ChacaTreeNodeConfig,
    readonly options: ReadonlyArray<unknown>,
  ) {
    super(config);

    if (Array.isArray(options)) {
      if (options.length === 0) {
        throw new EmptyEnumValuesError(this.getRouteString());
      }
    } else {
      throw new EmptyEnumValuesError(this.getRouteString());
    }
  }

  value() {
    const selectOption = this.utils.oneOfArray(this.options);
    return selectOption ? selectOption : null;
  }

  getNoArrayNode(): ChacaTreeNode {
    return new EnumValueNode(
      { ...this.getNodeConfig(), isArray: new FieldIsArray() },
      this.options,
    );
  }

  checkIfFieldExists(fieldTreeRoute: string[]): boolean {
    if (fieldTreeRoute.length === 0) {
      throw new TryRefANoKeyFieldError(this.getRouteString());
    } else {
      return false;
    }
  }
}
