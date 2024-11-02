import { ChacaError } from "../../../../../errors";
import { SpaceIndex } from "../../../core/space-index";
import { Imports } from "./import";
import { JavaClassFieldName, JavaClassName } from "./names";
import { JavaClass, JavaDatatype } from "./types";

export class SaveJavaClassField {
  readonly _name: JavaClassFieldName;
  private _datatype: JavaDatatype;

  constructor(name: JavaClassFieldName, datatype: JavaDatatype) {
    this._datatype = datatype;
    this._name = name;
  }

  name(): string {
    return this._name.string();
  }

  definition(imports: Imports): string {
    return this._datatype.definition(imports);
  }

  datatype() {
    return this._datatype;
  }

  setDatatype(d: JavaDatatype) {
    this._datatype = d;
  }
}

export class SaveJavaClass {
  readonly _name: JavaClassName;
  readonly fields: SaveJavaClassField[];
  readonly values: JavaClass[];
  readonly print: boolean;

  constructor(
    name: JavaClassName,
    fields: SaveJavaClassField[],
    print: boolean,
  ) {
    this.fields = fields;
    this._name = name;
    this.values = [];
    this.print = print;
  }

  variable(): string {
    return this._name.variable();
  }

  equal(other: SaveJavaClass): boolean {
    return this._name.equal(other._name);
  }

  find(name: JavaClassFieldName, datatype: JavaDatatype): SaveJavaClassField {
    const found = this.fields.find((f) => f._name.equal(name));

    if (found) {
      const similar = found.datatype().isSimilar(datatype);

      if (similar) {
        const greater = found.datatype().greater(datatype);
        found.setDatatype(greater);
      } else {
        throw new ChacaError(``);
      }

      return found;
    } else {
      const create = new SaveJavaClassField(name, datatype);
      this.fields.push(create);

      return create;
    }
  }

  name() {
    return this._name.string();
  }

  add(value: JavaClass) {
    this.values.push(value);
  }

  definition(index: SpaceIndex, imports: Imports): string {
    let code = `public class ${this.name()} {\n`;

    index.push();

    // fields
    const fields = [] as string[];
    for (const field of this.fields) {
      fields.push(
        index.create(`private ${field.definition(imports)} ${field.name()};`),
      );
    }

    code += fields.join("\n") + "\n\n";

    // constructor
    code += index.create(`public ${this.name()}(`);

    code += this.fields
      .map((f) => {
        return `${f.definition(imports)} ${f.name()}`;
      })
      .join(", ");

    code += ") {\n";

    index.push();

    code += this.fields
      .map((f) => {
        return index.create(`this.${f.name()} = ${f.name()};`);
      })
      .join(`\n`);

    index.reverse();

    code += "\n" + index.create("}\n\n");

    // getters and setters
    code += this.fields
      .map((f) => {
        let code = ``;

        // getter
        code += index.create(
          `public ${f.definition(imports)} ${f._name.getter()}() {\n`,
        );

        index.push();

        code += index.create(`return this.${f.name()};\n`);

        index.reverse();

        code += index.create(`}\n`);

        // space
        code += "\n";

        // setter
        code += index.create(
          `public void ${f._name.setter()}(${f.definition(
            imports,
          )} ${f.name()}) {\n`,
        );

        index.push();

        code += index.create(`this.${f.name()} = ${f.name()};\n`);

        index.reverse();

        code += index.create(`}\n`);

        return code;
      })
      .join("\n");

    index.reverse();

    code += index.create(`}`);

    return code;
  }
}

export class JavaClasses {
  readonly classes: SaveJavaClass[];

  constructor() {
    this.classes = [];
  }

  find(add: SaveJavaClass): SaveJavaClass {
    const found = this.classes.find((c) => c.equal(add));

    if (found) {
      return found;
    } else {
      this.classes.push(add);

      return add;
    }
  }
}
