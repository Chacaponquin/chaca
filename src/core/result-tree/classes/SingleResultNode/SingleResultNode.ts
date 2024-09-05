import { ChacaError } from "../../../../errors";
import { FieldNode } from "../FieldNode/FieldNode";

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

  changeIsTaken(fieldRoute: string[]) {
    this._taken.push(fieldRoute.join("."));
  }

  isTaken(fieldRoute: string[]): boolean {
    return this._taken.includes(fieldRoute.join("."));
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

  getRefValueByNodeRoute(fieldTreeRoute: string[]): SingleResultNode {
    if (fieldTreeRoute.length === 0) {
      return this;
    } else {
      throw new ChacaError(
        `The field ${fieldTreeRoute.join(".")} do not exists`,
      );
    }
  }
}
