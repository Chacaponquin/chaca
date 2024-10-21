import { ChacaUtils } from "../../../../utils";
import { Route } from "./route";

export class JavascriptClassName {
  constructor(private readonly utils: ChacaUtils, private route: Route) {}

  equal(other: JavascriptClassName): boolean {
    return other.route.equal(this.route);
  }

  string() {
    return this.utils.capitalize(this.utils.camelCase(this.route.string()));
  }
}

export class JavascriptClassFieldName {
  constructor(private readonly utils: ChacaUtils, private _name: string) {}

  equal(other: JavascriptClassFieldName): boolean {
    return other._name === this._name;
  }

  string() {
    return this.utils.camelCase(this._name);
  }
}
