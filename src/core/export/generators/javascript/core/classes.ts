import { JavascriptClassFieldName, JavascriptClassName } from "./names";
import {
  JavascriptClassField,
  JavascriptDatatype,
  JavascriptUndefined,
} from "./types";
import { UnionDatatypes } from "./union";

export class SaveClassField {
  private _name: JavascriptClassFieldName;
  readonly datatypes: UnionDatatypes;
  private _optional: boolean;

  constructor(name: JavascriptClassFieldName, datatype: JavascriptDatatype) {
    this.datatypes = new UnionDatatypes();
    this.datatypes.setDatatype(datatype);
    this._name = name;
    this._optional = false;
  }

  setDatatype(d: JavascriptDatatype): void {
    if (d instanceof JavascriptUndefined) {
      this._optional = true;
    } else {
      this.datatypes.setDatatype(d);
    }
  }

  optional() {
    return this._optional;
  }

  equal(other: SaveClassField): boolean {
    return other._name.equal(this._name);
  }

  name() {
    return this._name.string();
  }
}

export class SaveJavascriptClass {
  private _name: JavascriptClassName;
  readonly fields: SaveClassField[];

  constructor(name: JavascriptClassName) {
    this.fields = [];
    this._name = name;
  }

  setField(f: JavascriptClassField) {
    const found = this.fields.find((sf) => sf === f.save);

    if (found) {
      found.setDatatype(f.datatype);
    }
  }

  search(create: SaveClassField) {
    const found = this.fields.find((f) => f.equal(create));

    if (found) {
      return found;
    } else {
      this.fields.push(create);
      return create;
    }
  }

  name() {
    return this._name.string();
  }

  equal(other: SaveJavascriptClass): boolean {
    return this._name.equal(other._name);
  }

  definition(): string {
    let code = `interface ${this.name()} {\n`;

    this.fields.forEach((f) => {
      code += `   ${f.name()}: ${f.datatypes.declaration()}\n`;
    });

    code += "}\n";

    return code;
  }
}

export class JavascriptClasses {
  private readonly classes: SaveJavascriptClass[];

  constructor() {
    this.classes = [];
  }

  search(create: SaveJavascriptClass) {
    const found = this.classes.find((c) => c.equal(create));

    if (found) {
      return found;
    } else {
      this.classes.push(create);
      return create;
    }
  }

  string(): string {
    let code = ``;

    code += this.classes
      .reverse()
      .map((c) => {
        return `${c.definition()}`;
      })
      .join("\n");

    return code;
  }
}
