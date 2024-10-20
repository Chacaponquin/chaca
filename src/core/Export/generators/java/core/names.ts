import { ChacaUtils } from "../../../../utils";
import { Parent } from "./parent";

export class JavaClassFieldName {
  private _name: string;

  constructor(private readonly utils: ChacaUtils, name: string) {
    this._name = name;
  }

  getter(): string {
    return `${this.utils.camelCase(`get_${this.name()}`)}`;
  }

  setter(): string {
    return `${this.utils.camelCase(`set_${this.name()}`)}`;
  }

  equal(other: JavaClassFieldName): boolean {
    return this._name === other._name;
  }

  name(): string {
    return this._name;
  }

  string() {
    return this.utils.camelCase(this._name);
  }
}

export class JavaClassName {
  constructor(
    private readonly utils: ChacaUtils,
    private readonly parent: Parent,
  ) {}

  variable() {
    return this.utils.camelCase(this.parent.string());
  }

  name(): string {
    return this.parent.string();
  }

  equal(other: JavaClassName): boolean {
    return this.parent.equal(other.parent);
  }

  string() {
    return this.utils.capitalize(this.utils.camelCase(this.parent.string()));
  }
}
