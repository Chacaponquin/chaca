import {
  EmptySequentialValuesError,
  TryRefANoKeyFieldError,
} from "../../../../errors/ChacaError.js";
import { ChacaTreeNode } from "../ChacaTreeNode/ChacaTreeNode.js";

export class SequentialValueNode extends ChacaTreeNode {
  private valuesArray: Array<unknown>;

  constructor(fieldTreeRoute: Array<string>, valuesArray: Array<unknown>) {
    super({ fieldTreeRoute, isArray: null, posibleNull: 0 });
    this.valuesArray = valuesArray;
  }

  public getNoArrayNode(): ChacaTreeNode {
    return new SequentialValueNode(
      this.getNodeConfig().fieldTreeRoute,
      this.valuesArray,
    );
  }

  public checkIfFieldExists(fieldTreeRoute: string[]): boolean {
    if (fieldTreeRoute.length === 0) {
      throw new TryRefANoKeyFieldError(this.getNodeConfig().fieldTreeRoute);
    } else {
      return false;
    }
  }

  public getSequentialValue(): unknown {
    if (this.valuesArray.length === 0) {
      throw new EmptySequentialValuesError(this.getNodeConfig().fieldTreeRoute);
    } else {
      const returnValue = this.valuesArray[0];
      this.valuesArray = this.valuesArray.slice(1);
      return returnValue;
    }
  }
}
