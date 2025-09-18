import {
  EmptyEnumValuesError,
  TryRefANoKeyFieldError,
} from "../../../../errors";
import { FieldNode } from "../../../result-tree/classes/node/field-node";
import { SingleResultNode } from "../../../result-tree/classes/single-result";
import { ChacaUtils } from "../../../utils";
import { IsArray, NotArray } from "../is-array/is-array";
import { InputTreeNode } from "../node/input-tree-node";
import { NodeRoute } from "../node/value-object/route";
import { PossibleNull } from "../possible-null/possible-null";

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

  generate(): Promise<FieldNode> {
    const result = new SingleResultNode({
      name: this.getName(),
      value: this.value(),
    });

    return new Promise((resolve) => resolve(result));
  }

  checkIfFieldExists(fieldTreeRoute: string[]): boolean {
    if (fieldTreeRoute.length === 0) {
      throw new TryRefANoKeyFieldError(this.getRouteString());
    } else {
      return false;
    }
  }
}
