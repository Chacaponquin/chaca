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
}

export class SequentialValueNode extends ChacaTreeNode {
  private index = 0;

  private valuesArray: Array<unknown>;
  private config: Required<SequentialFieldConfig>;

  constructor({
    config,
    fieldTreeRoute,
    valuesArray,
  }: SequentialValueNodeProps) {
    super({ fieldTreeRoute, isArray: null, posibleNull: 0 });
    this.valuesArray = valuesArray;
    this.config = config;

    if (this.valuesArray.length === 0) {
      throw new EmptySequentialValuesError(this.getFieldRoute());
    }
  }

  public getNoArrayNode(): ChacaTreeNode {
    return new SequentialValueNode({
      fieldTreeRoute: this.getFieldRoute(),
      valuesArray: this.valuesArray,
      config: this.config,
    });
  }

  public checkIfFieldExists(fieldTreeRoute: string[]): boolean {
    if (fieldTreeRoute.length === 0) {
      throw new TryRefANoKeyFieldError(this.getFieldRoute());
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
        throw new EmptySequentialValuesError(this.getFieldRoute());
      } else {
        const returnValue = this.valuesArray[this.index];
        this.index++;
        return returnValue;
      }
    }
  }
}
