import { SpaceIndex } from "../../../core/space-index";
import { Imports } from "./import";
import { PythonClassFieldName, PythonClassName } from "./names";
import { PythonClassField, PythonDatatype } from "./type";
import { UnionDatatypes } from "./union";

export class SaveClassField {
  private _name: PythonClassFieldName;
  readonly datatypes: UnionDatatypes;

  constructor(name: PythonClassFieldName, datatype: PythonDatatype) {
    this.datatypes = new UnionDatatypes();
    this.datatypes.setDatatype(datatype);
    this._name = name;
  }

  setDatatype(d: PythonDatatype): void {
    this.datatypes.setDatatype(d);
  }

  name() {
    return this._name.string();
  }

  equal(other: SaveClassField): boolean {
    return other._name.equal(this._name);
  }

  declaration(imports: Imports) {
    imports.add({ from: "typing", modules: ["TypedDict"] });

    return this.datatypes.declaration(imports);
  }
}

export class SavePythonClass {
  private _name: PythonClassName;
  readonly fields: SaveClassField[];

  constructor(name: PythonClassName) {
    this.fields = [];
    this._name = name;
  }

  setField(field: PythonClassField) {
    const found = this.fields.find((f) => f === field.save);

    if (found) {
      found.setDatatype(field.datatype);
    }
  }

  equal(other: SavePythonClass): boolean {
    return other._name.equal(this._name);
  }

  name() {
    return this._name.string();
  }

  search(field: SaveClassField): SaveClassField {
    const found = this.fields.find((f) => f.equal(field));

    if (found) {
      return found;
    } else {
      this.fields.push(field);
      return field;
    }
  }

  definition(index: SpaceIndex, imports: Imports): string {
    imports.add({ from: "typing", modules: ["TypedDict"] });

    let code = `class ${this.name()}(TypedDict):\n`;

    index.push();

    code += this.fields
      .map((f) => {
        return index.create(`${f.name()}: ${f.datatypes.declaration(imports)}`);
      })
      .join("\n");

    index.reverse();

    return code;
  }
}

export class PythonClasses {
  private readonly classes: SavePythonClass[];

  constructor() {
    this.classes = [];
  }

  search(name: PythonClassName): SavePythonClass {
    const create = new SavePythonClass(name);
    const found = this.classes.find((c) => c.equal(create));

    if (found) {
      return found;
    } else {
      this.classes.push(create);
      return create;
    }
  }

  definition(index: SpaceIndex, imports: Imports): string {
    let code = ``;

    code += this.classes
      .reverse()
      .map((c) => {
        return `${c.definition(index, imports)}\n`;
      })
      .join("\n");

    return code;
  }
}
