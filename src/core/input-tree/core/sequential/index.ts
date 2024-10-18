import {
  EmptySequentialValuesError,
  TryRefANoKeyFieldError,
} from "../../../../errors";
import { SequentialFieldConfig } from "../../../fields/core/sequential/SequentialField";
import { FieldNode, SingleResultNode } from "../../../result-tree/classes";
import { NotArray } from "../is-array";
import { InputTreeNode } from "../node";
import { NodeRoute } from "../node/value-object/route";
import { PossibleNull } from "../possible-null";

export class SequentialValueNode extends InputTreeNode {
  private index = 0;

  private valuesArray: unknown[];
  private config: Required<SequentialFieldConfig>;

  constructor(
    route: NodeRoute,
    possibleNull: PossibleNull,
    array: unknown[],
    config: Required<SequentialFieldConfig>,
  ) {
    super(route, new NotArray(), possibleNull);

    this.valuesArray = array;
    this.config = config;

    if (Array.isArray(this.valuesArray)) {
      if (this.valuesArray.length === 0) {
        throw new EmptySequentialValuesError(this.getRouteString());
      }
    } else {
      throw new EmptySequentialValuesError(this.getRouteString());
    }
  }

  getNoArrayNode(): InputTreeNode {
    return new SequentialValueNode(
      this.route,
      this.possibleNull,
      this.valuesArray,
      this.config,
    );
  }

  checkIfFieldExists(fieldTreeRoute: string[]): boolean {
    if (fieldTreeRoute.length === 0) {
      throw new TryRefANoKeyFieldError(this.getRouteString());
    } else {
      return false;
    }
  }

  private value(): unknown {
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

  generate(): FieldNode {
    return new SingleResultNode({
      name: this.getNodeName(),
      value: this.value(),
    });
  }
}
