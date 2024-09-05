import {
  EmptySequentialValuesError,
  TryRefANoKeyFieldError,
} from "../../../../errors";
import { FieldPossibleNullConfig } from "../../../schema/interfaces/schema";
import { SequentialFieldConfig } from "../../../fields/core/sequential/SequentialField";
import { ChacaTreeNode } from "../node";

export interface SequentialValueNodeProps {
  fieldTreeRoute: string[];
  valuesArray: unknown[];
  config: Required<SequentialFieldConfig>;
  possibleNull: FieldPossibleNullConfig;
}

export class SequentialValueNode extends ChacaTreeNode {
  private index = 0;

  private valuesArray: unknown[];
  private config: Required<SequentialFieldConfig>;
  private possibleNull: FieldPossibleNullConfig;

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

    if (Array.isArray(this.valuesArray)) {
      if (this.valuesArray.length === 0) {
        throw new EmptySequentialValuesError(this.getRouteString());
      }
    } else {
      throw new EmptySequentialValuesError(this.getRouteString());
    }
  }

  getNoArrayNode(): ChacaTreeNode {
    return new SequentialValueNode({
      fieldTreeRoute: this.getFieldRoute(),
      valuesArray: this.valuesArray,
      config: this.config,
      possibleNull: this.possibleNull,
    });
  }

  checkIfFieldExists(fieldTreeRoute: string[]): boolean {
    if (fieldTreeRoute.length === 0) {
      throw new TryRefANoKeyFieldError(this.getRouteString());
    } else {
      return false;
    }
  }

  value(): unknown {
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
