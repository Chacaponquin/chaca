import { TryRefANoKeyFieldError } from "../../../../errors/ChacaError.js";
import { SequenceFieldProps } from "../../../Fields/core/SequenceField/SequenceField.js";
import { ChacaTreeNode } from "../ChacaTreeNode/ChacaTreeNode.js";

interface SequenceProps {
  fieldTreeRoute: Array<string>;
  config: Required<SequenceFieldProps>;
  possibleNull: number;
}

export class SequenceValueNode extends ChacaTreeNode {
  private actualValue: number;
  private _config: Required<SequenceFieldProps>;
  private _possibleNull: number;

  constructor({ config, fieldTreeRoute, possibleNull }: SequenceProps) {
    super({
      isArray: null,
      fieldTreeRoute: fieldTreeRoute,
      possibleNull: possibleNull,
    });
    this._config = config;
    this.actualValue = config.starsWith;
    this._possibleNull = possibleNull;
  }

  public getConfig() {
    return this._config;
  }

  public getNextValue() {
    const returnValue = this.actualValue;
    this.actualValue += this._config.step;

    return returnValue;
  }

  public checkIfFieldExists(fieldTreeRoute: string[]): boolean {
    if (fieldTreeRoute.length === 0) {
      throw new TryRefANoKeyFieldError(this.getRouteString());
    } else {
      return false;
    }
  }

  public getNoArrayNode(): ChacaTreeNode {
    return new SequenceValueNode({
      fieldTreeRoute: this.getNodeConfig().fieldTreeRoute,
      config: this._config,
      possibleNull: this._possibleNull,
    });
  }
}
