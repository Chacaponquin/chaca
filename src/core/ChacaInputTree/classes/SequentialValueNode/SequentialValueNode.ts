import {
  EmptySequentialValuesError,
  TryRefANoKeyFieldError,
} from "../../../../errors/ChacaError.js";
import { SequentialFieldConfig } from "../../../Fields/core/SequentialField/SequentialField.js";
import { ChacaTreeNode } from "../ChacaTreeNode/ChacaTreeNode.js";

export interface SequentialValueNodeProps {
  fieldTreeRoute: Array<string>;
  valuesArray: Array<unknown>;
  config: Required<SequentialFieldConfig>;
  possibleNull: number;
}

export class SequentialValueNode extends ChacaTreeNode {
  private index = 0;

  private valuesArray: Array<unknown>;
  private config: Required<SequentialFieldConfig>;
  private possibleNull: number;

  constructor({
    config,
    fieldTreeRoute,
    valuesArray,
    possibleNull,
  }: SequentialValueNodeProps) {
    super({ fieldTreeRoute, isArray: null, possibleNull: possibleNull });
    this.valuesArray = valuesArray;
    this.config = config;
    this.possibleNull = possibleNull;

    if (this.valuesArray.length === 0) {
      throw new EmptySequentialValuesError(this.getRouteString());
    }
  }

  public getNoArrayNode(): ChacaTreeNode {
    return new SequentialValueNode({
      fieldTreeRoute: this.getFieldRoute(),
      valuesArray: this.valuesArray,
      config: this.config,
      possibleNull: this.possibleNull,
    });
  }

  public checkIfFieldExists(fieldTreeRoute: string[]): boolean {
    if (fieldTreeRoute.length === 0) {
      throw new TryRefANoKeyFieldError(this.getRouteString());
    } else {
      return false;
    }
  }

  public getSequentialValue(): unknown {
    if (this.config.loop) {
      if (this.index === this.valuesArray.length) {
        this.index = 0;
      }

      const returnValue = this.valuesArray[this.index];
      this.index++;

      return returnValue;
    } else {
      if (this.index >= this.valuesArray.length) {
        throw new EmptySequentialValuesError(this.getRouteString());
      } else {
        const returnValue = this.valuesArray[this.index];
        this.index++;

        return returnValue;
      }
    }
  }
}
