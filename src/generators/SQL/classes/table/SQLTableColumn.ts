import { SQLType } from "../dataSQLTypes/SQLType.js";
import { ChacaError } from "../../../../errors/ChacaError.js";
import { SQLNull } from "../dataSQLTypes/SQLNull.js";

export class SQLTableColumn {
  private rows: Array<SQLType> = [];
  private columnConfig = {
    primaryKey: false,
    foreignKey: false,
    posibleNull: false,
  };

  constructor(public readonly columnName: string) {}

  public insertValue(value: SQLType) {
    if (this.rows.length === 0) {
      this.rows.push(value);
    } else {
      const firstType = this.rows[0];

      if (firstType.equal(value)) {
        this.rows.push(value);
      } else if (value instanceof SQLNull) {
        this.rows.push(value);
        this.columnConfig.posibleNull = true;
      } else {
        throw new ChacaError(`Incorrect type for column ${this.columnName}`);
      }
    }
  }

  public concatValues(otherColumn: SQLTableColumn): void {
    for (const v of otherColumn.rows) {
      this.rows.push(v);
    }
  }

  public getColumnLenght(): number {
    return this.rows.length;
  }
}
