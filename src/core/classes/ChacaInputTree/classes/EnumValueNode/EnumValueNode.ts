import { TryRefANoKeyFieldError } from "../../../../../errors/ChacaError.js";
import { PrivateUtils } from "../../../../helpers/PrivateUtils.js";
import { ChacaTreeNodeConfig } from "../../interfaces/tree.interface.js";
import { ChacaTreeNode } from "../ChacaTreeNode/ChacaTreeNode.js";

export class EnumValueNode extends ChacaTreeNode {
  constructor(
    config: ChacaTreeNodeConfig,
    public readonly enumOptions: Array<any>,
  ) {
    super(config);
  }

  public getValue(): any {
    const selectOption = PrivateUtils.oneOfArray(this.enumOptions);

    return selectOption ? selectOption : null;
  }

  public getNoArrayNode(): ChacaTreeNode {
    return new EnumValueNode(
      { ...this.nodeConfig, isArray: null },
      this.enumOptions,
    );
  }

  public checkIfFieldExists(fieldTreeRoute: string[]): boolean {
    if (fieldTreeRoute.length === 0) {
      throw new TryRefANoKeyFieldError(this.nodeConfig.name);
    } else {
      return false;
    }
  }
}
