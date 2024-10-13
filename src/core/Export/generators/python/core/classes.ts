import { Imports } from "./import";
import { VariableName } from "./names";
import { Parent } from "./parent";
import { PythonClass, PythonDatatype } from "./type";
import { UnionDatatypes } from "./union";

export class SaveClassField {
  private _name: VariableName;
  readonly datatypes: UnionDatatypes;

  constructor(imports: Imports, name: VariableName, datatype: PythonDatatype) {
    this.datatypes = new UnionDatatypes(imports);
    this.datatypes.setDatatype(datatype);
    this._name = name;

    imports.add({ from: "typing", modules: ["TypedDict"] });
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

export class SavePythonClass {
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

  merge(other: SavePythonClass): void {
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
    let code = `class ${this.name()}(TypedDict):\n`;

    this.fields.forEach((f) => {
      code += `   ${f.name()}: ${f.datatypes.declaration()}\n`;
    });

    return code;
  }
}

export class PythonClasses {
  private readonly classes: SavePythonClass[];

  constructor(private readonly imports: Imports) {
    this.classes = [];
  }

  add(c: PythonClass): void {
    const fields = [] as SaveClassField[];
    for (const field of c.fields) {
      const saveField = new SaveClassField(
        this.imports,
        field._name,
        field.datatype,
      );

      fields.push(saveField);
    }

    const save = new SavePythonClass(c._name, c.parent, fields);

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
