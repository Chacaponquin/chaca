import { ChacaUtils } from "../../utils";

interface Props {
  name: string;
}

export type Case = "camel" | "snake" | "none";

export class VariableName {
  private _name: string;

  constructor(private readonly utils: ChacaUtils, { name }: Props) {
    this._name = name;
  }

  name() {
    return this._name;
  }

  set(name: string) {
    this._name = name;
  }

  equal(other: VariableName): boolean {
    return other._name === this._name;
  }

  value(c: Case) {
    if (c === "camel") {
      return this.utils.capitalize(this.utils.camelCase(this._name));
    } else if (c === "snake") {
      return this.utils.snakeCase(this._name);
    } else {
      return this._name;
    }
  }
}
