import { ChacaError, NotExistRefFieldError } from "../../../../errors";
import { NodeRoute } from "../../../input-tree/core/node/value-object/route";
import { FieldNode, GetRefValueProps } from "../node";

interface Props {
  name: string;
  value: unknown;
}

export class SingleResultNode extends FieldNode {
  private _value: unknown;
  private _taken: string[] = [];

  constructor({ name, value }: Props) {
    super(name);
    this._value = value;
  }

  protected value(): unknown {
    return this._value;
  }

  changeIsTaken(fieldRoute: NodeRoute) {
    this._taken.push(fieldRoute.string());
  }

  isTaken(fieldRoute: NodeRoute): boolean {
    return this._taken.includes(fieldRoute.string());
  }

  getNodeByRoute(fieldTreeRoute: string[]): FieldNode {
    if (fieldTreeRoute.length === 0) {
      return this;
    } else {
      throw new ChacaError(
        `The field ${fieldTreeRoute.join(".")} do not exists`,
      );
    }
  }

  getRefValueByNodeRoute({
    caller,
    search,
    baseSearch,
  }: GetRefValueProps): SingleResultNode {
    if (search.empty()) {
      return this;
    } else {
      throw new NotExistRefFieldError(caller.string(), baseSearch.string());
    }
  }
}
