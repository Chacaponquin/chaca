import { SQLNode } from "./SQLNode.js";
import { SQLTable } from "../table/SQLTable.js";
import { SQLTableColumn } from "../table/SQLTableColumn.js";
import { SQLType } from "./SQLType.js";
import { SQLArray } from "./SQLArray.js";

export class SQLObject extends SQLType {
  private objectFields: Array<SQLNode> = [];

  public getFields() {
    return this.objectFields;
  }

  public insertSubField(field: SQLNode): void {
    this.objectFields.push(field);
  }

  public createTableColumn(
    fieldName: string,
    tables: Array<SQLTable>,
  ): SQLTableColumn {
    // new table creation
    const newTable = new SQLTable(fieldName);
    tables.push(newTable);

    this.objectFields.forEach((o) => {
      const objectValueType = o.getValueType();
      if (objectValueType instanceof SQLObject) {
        const newColumn = objectValueType.createTableColumn(
          o.getFieldName(),
          tables,
        );

        newTable.insertColumn(newColumn);
      } else if (objectValueType instanceof SQLArray) {
        objectValueType.createTableColumn(o.getFieldName(), newTable, tables);
      } else {
        const newColumn = new SQLTableColumn(o.getFieldName());
        newTable.insertColumn(newColumn);

        newColumn.insertAllRowValues(o.getValues());
      }
    });

    // creation of the return column
    const newForengKeyColumn = new SQLTableColumn(
      this.createForengColumnName(fieldName),
    );

    const externalIDList = newTable.getTablePrimaryKeyColumn().getRows();
    newForengKeyColumn.insertAllRowValues(externalIDList);

    return newForengKeyColumn;
  }

  private createForengColumnName(name: string) {
    return `${name}_id`;
  }

  public equal(otherType: SQLType): boolean {
    if (otherType instanceof SQLObject) {
      if (this.objectFields.length === otherType.getFields().length) {
        let areEqual = true;

        for (let i = 0; i < this.objectFields.length && areEqual; i++) {
          const e = this.objectFields[i].equal(otherType.getFields()[i]);

          if (!e) {
            areEqual = false;
          }
        }

        if (areEqual) {
          this.objectFields.forEach((o, i) => {
            o.insertValue(otherType.getFields()[i].getFirstValue());
          });
        }

        return areEqual;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}
