import { SQLNode } from "./SQLNode.js";
import { SQLTable } from "./SQLTable.js";
import { SQLTableColumn } from "./SQLTableColumn.js";
import { SQLType } from "./SQLType.js";
import { SQLArray } from "./SQLArray.js";

export class SQLObject extends SQLType {
  private objectFields: Array<SQLNode> = [];

  constructor(value: any) {
    super(value);
  }

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
        const newColumn = objectValueType.createTableColumn(fieldName, tables);
        newTable.insertColumn(newColumn);
      } else if (objectValueType instanceof SQLArray) {
        objectValueType.createTableColumn(fieldName, newTable, tables);
      } else {
        const newColumn = new SQLTableColumn(fieldName, o.canBeNull());
        newTable.insertColumn(newColumn);

        newColumn.insertAllValues(o.getValues());
      }
    });

    // creation of the return column
    const newForengKeyColumn = new SQLTableColumn(
      this.createForengColumnName(fieldName),
      false,
    );

    const externalIDList = newTable.getTablePrimaryKey().getRows();
    newForengKeyColumn.insertAllValues(externalIDList);

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

        return areEqual;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}
