import { VariableName } from "../../../core/names";
import { Parent } from "../../../core/parent";
import { JavascriptClass, JavascriptDatatype } from "./types";
import { UnionDatatypes } from "./union";

export class SaveClassField {
  private _name: VariableName;
  readonly datatypes: UnionDatatypes;

  constructor(name: VariableName, datatype: JavascriptDatatype) {
    this.datatypes = new UnionDatatypes();
    this.datatypes.setDatatype(datatype);
    this._name = name;
  }

  name() {
    return this._name.value("snake");
  }

  merge(other: SaveClassField): void {
    for (const datatype of other.datatypes.datatypes) {
      this.datatypes.setDatatype(datatype);
    }
  }
}

export class SaveJavascriptClass {
  readonly parent: Parent;
  private _name: VariableName;
  readonly fields: SaveClassField[];

  constructor(name: VariableName, parent: Parent, fields: SaveClassField[]) {
    this.fields = fields;
    this.parent = parent;
    this._name = name;
  }

  name() {
    return this._name.value("camel");
  }

  merge(other: SaveJavascriptClass): void {
    for (const field of other.fields) {
      const found = this.fields.find((f) => f.name() === field.name());

      if (found) {
        found.merge(field);
      } else {
        this.fields.push(field);
      }
    }
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

  add(c: JavascriptClass): void {
    const fields = [] as SaveClassField[];
    for (const field of c.fields) {
      const saveField = new SaveClassField(field._name, field.datatype);

      fields.push(saveField);
    }

    const save = new SaveJavascriptClass(c._name, c.parent, fields);

    let found = false;
    for (const c of this.classes) {
      if (c.parent.equal(save.parent)) {
        c.merge(save);

        found = true;
      }
    }

    if (!found) {
      this.classes.push(save);
    }
  }

  string(): string {
    let code = ``;

    this.classes.forEach((c) => {
      code += `${c.definition()}\n`;
    });

    return code;
  }
}
