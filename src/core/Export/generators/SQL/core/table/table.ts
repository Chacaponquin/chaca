import { VariableName } from "../../../../core/names";
import { Parent } from "../../../../core/parent";
import { SQLColumn } from "./column";

export class SQLTable {
  readonly parent: Parent;
  private _name: VariableName;
  readonly fields: SQLColumn[];

  constructor(name: VariableName, parent: Parent) {
    this.fields = [];
    this.parent = parent;
    this._name = name;
  }

  name() {
    return this._name.value("camel");
  }

  add(column: SQLColumn) {
    this.fields.push(column);
  }

  merge(other: SQLTable): void {
    for (const column of other.fields) {
      const found = this.fields.find((f) => f.name() === column.name());

      if (found) {
        const similar = found.similar(column);

        found.merge(column);
      } else {
        this.fields.push(column);
      }
    }
  }

  definition(): string {
    let code = `interface ${this.name()} {\n`;

    this.fields.forEach((f) => {
      code += `   ${f.name()}: ${f.definition()}\n`;
    });

    code += "}\n";

    return code;
  }
}
