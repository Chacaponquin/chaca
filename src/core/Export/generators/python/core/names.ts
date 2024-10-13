import { ChacaUtils } from "../../../../utils";

interface Props {
  name: string;
}

type Case = "camel" | "snake";

export class VariableName {
  private readonly _name: string;

  constructor(private readonly utils: ChacaUtils, { name }: Props) {
    this._name = name;
  }

  value(c: Case) {
    if (c === "camel") {
      return this.utils.capitalize(this.utils.camelCase(this._name));
    } else {
      return this.utils.snakeCase(this._name);
    }
  }
}
