import { TryRefANoKeyFieldError } from "../../../../../errors/ChacaError.js";
import { SequenceFieldProps } from "../../../SequenceField/SequenceField.js";
import { ChacaTreeNode } from "../ChacaTreeNode/ChacaTreeNode.js";

export class SequenceValueNode extends ChacaTreeNode {
  private actualValue: number;

  constructor(
    fieldTreeRoute: Array<string>,
    private config: SequenceFieldProps,
  ) {
    super({ isArray: null, fieldTreeRoute: fieldTreeRoute, posibleNull: 0 });
    this.actualValue = config.starsWith;
  }

  public getConfig() {
    return this.config;
  }

  public getNextValue() {
    const returnValue = this.actualValue;
    this.actualValue++;

    return returnValue;
  }

  public checkIfFieldExists(fieldTreeRoute: string[]): boolean {
    if (fieldTreeRoute.length === 0) {
      throw new TryRefANoKeyFieldError(this.getNodeName());
    } else {
      return false;
    }
  }

  public getNoArrayNode(): ChacaTreeNode {
    return new SequenceValueNode(
      this.getNodeConfig().fieldTreeRoute,
      this.config,
    );
  }
}
