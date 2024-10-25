import { ChacaUtils } from "../../../../utils";
import { Route } from "./route";

export class PythonClassName {
  constructor(private readonly utils: ChacaUtils, private route: Route) {}

  equal(other: PythonClassName): boolean {
    return other.route.equal(this.route);
  }

  string() {
    return this.utils.pascalCase(this.route.string());
  }
}

export class PythonClassFieldName {
  constructor(private readonly utils: ChacaUtils, private _name: string) {}

  equal(other: PythonClassFieldName): boolean {
    return other._name === this._name;
  }

  string() {
    return this.utils.snakeCase(this._name);
  }
}
