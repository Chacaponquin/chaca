import { SQLType } from "../dataSQLTypes/SQLType.js";
import { SQLTypeWithDefinition } from "../dataSQLTypes/SQLTypeWithDefinition.js";
import { ChacaError } from "../../../../errors/ChacaError.js";
import { SQLNull } from "../dataSQLTypes/SQLNull.js";
import { SQLDefinition, SQLNullDefinition } from "../definitionTypes/index.js";

export class SQLTableColumn {
  private values: Array<SQLTypeWithDefinition> = [];
  private isNull = false;
  private columnType: SQLDefinition = new SQLNullDefinition();

  constructor(public readonly columnName: string) {}

  public insertRowValue(value: SQLType): void {
    if (value instanceof SQLTypeWithDefinition) {
      // añadir valor a la columna
      this.values.push(value);

      // cambiar el tipo de la columna
      this.changeColumnType(SQLDefinition.getTypeFromValue(value));

      if (value instanceof SQLNull) {
        this.changeIsNull();
      }
    } else {
      throw new ChacaError("This value has not SQL Definition");
    }
  }

  public changeColumnType(columnType: SQLDefinition) {
    this.columnType = columnType;
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

  public getColumnType(): SQLDefinition {
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
