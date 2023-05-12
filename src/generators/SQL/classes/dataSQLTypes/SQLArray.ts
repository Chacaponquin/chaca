import { createPrimaryKey } from "../../utils/createPrimaryKey.js";
import { SQLNull } from "./SQLNull.js";
import { SQLTable } from "../table/SQLTable.js";
import { SQLTableColumn } from "../table/SQLTableColumn.js";
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

    const idColumn = new SQLTableColumn("id");
    const valuesColumn = new SQLTableColumn("value");
    const parentIDColumn = new SQLTableColumn(
      this.createParentIDColumnName(parentTable.tableName),
    );

    this.values.forEach((v) => {
      idColumn.insertRowValue(createPrimaryKey());
      valuesColumn.insertRowValue(v);
    });

    parentIDColumn.insertAllRowValues(
      parentTable.getTablePrimaryKeyColumn().getRows(),
    );

    newArrayTable.insertColumn(idColumn);
    newArrayTable.insertColumn(valuesColumn);
    newArrayTable.insertColumn(parentIDColumn);

    tables.push(newArrayTable);
  }
}
