import { SQLType } from "./SQLType.js";
import { SQLTypeWithDefinition } from "./SQLTypeWithDefinition.js";
import { ChacaError } from "../../../errors/ChacaError.js";
import { SQLNull } from "./SQLNull.js";
import { ColumnVariation } from "../interfaces/sqlTable.interface.js";

export class SQLTableColumn {
  private values: Array<SQLTypeWithDefinition> = [];
  private isNull = false;
  private columnType: SQLTypeWithDefinition = new SQLNull();

  constructor(public readonly columnName: string) {}

  public insertRowValue(value: SQLType): void {
    if (value instanceof SQLTypeWithDefinition) {
      this.values.push(value);
      this.changeColumnType(value);

      if (value instanceof SQLNull) {
        this.changeIsNull();
      }
    } else {
      throw new ChacaError("This value has not SQL Definition");
    }
  }

  public changeColumnType(columnType: SQLTypeWithDefinition) {
    this.columnType = columnType;
  }

  public changeColumnByVariation(variation: ColumnVariation): void {
    this.changeColumnType(variation.newType);

    if (variation.isNull) {
      this.changeIsNull();
    }
  }

  public couldBeNull() {
    return this.isNull;
  }

  public changeIsNull() {
    this.isNull = true;
  }

  public insertAllRowValues(values: Array<SQLType>): void {
    values.forEach((v) => {
      this.insertRowValue(v);
    });
  }

  public getColumnType(): SQLTypeWithDefinition {
    return this.columnType;
  }

  public getCantDocuments() {
    return this.values.length;
  }

  public getValueByIndex(index: number) {
    return this.values[index].getSQLValue();
  }

  public getRows() {
    return this.values;
  }
}
