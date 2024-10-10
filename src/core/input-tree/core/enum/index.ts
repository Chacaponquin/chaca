import {
  EmptyEnumValuesError,
  TryRefANoKeyFieldError,
} from "../../../../errors";
import { ChacaUtils } from "../../../utils";
import { ChacaTreeNodeConfig } from "../../interfaces/tree";
import { NotArray } from "../is-array";
import { InputTreeNode } from "../node";

export class EnumValueNode extends InputTreeNode {
  constructor(
    private readonly utils: ChacaUtils,
    config: ChacaTreeNodeConfig,
    private readonly options: ReadonlyArray<unknown>,
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
    return this.utils.oneOfArray(this.options);
  }

  getNoArrayNode(): InputTreeNode {
    return new EnumValueNode(
      this.utils,
      { ...this.getNodeConfig(), isArray: new NotArray() },
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
