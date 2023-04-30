import { createPrimaryKey } from "../utils/createPrimaryKey.js";
import { SQLNull } from "./SQLNull.js";
import { SQLTable } from "./SQLTable.js";
import { SQLTableColumn } from "./SQLTableColumn.js";
import { SQLType } from "./SQLType.js";

export class SQLArray extends SQLType {
  private values: Array<SQLType> = [];

  public equal(otherType: SQLType): boolean {
    if (otherType instanceof SQLArray) {
      return this.getArrayType().equal(otherType.getArrayType());
    } else {
      return false;
    }
  }

  public insertValue(node: SQLType): void {
    this.values.push(node);
  }

  public getArrayType(): SQLType {
    if (this.values[0]) {
      return this.values[0];
    } else {
      return new SQLNull();
    }
  }

  private createParentIDColumnName(columnName: string): string {
    return `${columnName}_id`;
  }

  public createTableColumn(
    fieldName: string,
    parentTable: SQLTable,
    tables: Array<SQLTable>,
  ) {
    const newArrayTable = new SQLTable(fieldName);

    const idColumn = new SQLTableColumn("id", false);
    const valuesColumn = new SQLTableColumn("value", false);
    const parentIDColumn = new SQLTableColumn(
      this.createParentIDColumnName(parentTable.tableName),
      false,
    );

    this.values.forEach((v) => {
      idColumn.insertValue(createPrimaryKey());
      valuesColumn.insertValue(v);
    });

    parentIDColumn.insertAllValues(parentTable.getTablePrimaryKey().getRows());

    newArrayTable.insertColumn(idColumn);
    newArrayTable.insertColumn(valuesColumn);
    newArrayTable.insertColumn(parentIDColumn);

    tables.push(newArrayTable);
  }
}
