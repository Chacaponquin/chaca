import {
  EmptyEnumValuesError,
  TryRefANoKeyFieldError,
} from "../../../../errors";
import { FieldNode, SingleResultNode } from "../../../result-tree/classes";
import { ChacaUtils } from "../../../utils";
import { IsArray, NotArray } from "../is-array";
import { InputTreeNode } from "../node";
import { NodeRoute } from "../node/value-object/route";
import { PossibleNull } from "../possible-null";

export class EnumValueNode extends InputTreeNode {
  constructor(
    private readonly utils: ChacaUtils,
    route: NodeRoute,
    isArray: IsArray,
    possibleNull: PossibleNull,
    private readonly options: ReadonlyArray<unknown>,
  ) {
    super(route, isArray, possibleNull);

    if (Array.isArray(options)) {
      if (options.length === 0) {
        throw new EmptyEnumValuesError(this.getRouteString());
      }
    } else {
      throw new EmptyEnumValuesError(this.getRouteString());
    }
  }

  private value() {
    return this.utils.oneOfArray(this.options);
  }

  getNoArrayNode(): InputTreeNode {
    return new EnumValueNode(
      this.utils,
      this.route,
      new NotArray(),
      this.possibleNull,
      this.options,
    );
  }

  generate(): FieldNode {
    return new SingleResultNode({
      name: this.getName(),
      value: this.value(),
    });
  }

  checkIfFieldExists(fieldTreeRoute: string[]): boolean {
    if (fieldTreeRoute.length === 0) {
      throw new TryRefANoKeyFieldError(this.getRouteString());
    } else {
      return false;
    }
  }
}
