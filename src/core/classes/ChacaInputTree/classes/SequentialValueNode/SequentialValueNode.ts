import {
  EmptySequentialValuesError,
  TryRefANoKeyFieldError,
} from "../../../../../errors/ChacaError.js";
import { ChacaTreeNode } from "../ChacaTreeNode/ChacaTreeNode.js";

export class SequentialValueNode extends ChacaTreeNode {
  private valuesArray: Array<unknown>;

  constructor(name: string, valuesArray: Array<unknown>) {
    super({ name, isArray: null, posibleNull: 0 });
    this.valuesArray = valuesArray;
  }

  public getNoArrayNode(): ChacaTreeNode {
    return new SequentialValueNode(this.nodeConfig.name, this.valuesArray);
  }

  public checkIfFieldExists(fieldTreeRoute: string[]): boolean {
    if (fieldTreeRoute.length === 0) {
      throw new TryRefANoKeyFieldError(this.nodeConfig.name);
    } else {
      return false;
    }
  }

  public getSequentialValue(): unknown {
    if (this.valuesArray.length === 0) {
      throw new EmptySequentialValuesError(this.nodeConfig.name);
    } else {
      const returnValue = this.valuesArray[0];

      this.valuesArray = this.valuesArray.slice(1);

      return returnValue;
    }
  }
}
