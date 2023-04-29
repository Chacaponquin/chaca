import { SQLNode } from "./SQLNode.js";
import { SQLPrimaryKey } from "./SQLPrimaryKey.js";
import { SQLTable } from "./SQLTable.js";
import { SQLTableField } from "./SQLTableField.js";
import { SQLType } from "./SQLType.js";

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

  private getPrimaryKey(): SQLNode {
    return this.objectFields.find(
      (o) => o.getValueType() instanceof SQLPrimaryKey,
    ) as SQLNode;
  }

  public createTableField(
    fieldName: string,
    tables: Array<SQLTable>,
  ): SQLTableField {
    const newTable = new SQLTable(fieldName);

    this.objectFields.forEach((o) => {
      let newField: SQLTableField;

      const objectValueType = o.getValueType();
      if (objectValueType instanceof SQLObject) {
        newField = objectValueType.createTableField(fieldName, tables);
      } else {
        newField = new SQLTableField(objectValueType, o.canBeNull());
      }

      newTable.insertField(newField);
    });

    tables.push(newTable);

    const primaryKey = this.getPrimaryKey();
    const newForengKeyField = new SQLTableField(
      primaryKey.getValueType(),
      primaryKey.canBeNull(),
    );

    return newForengKeyField;
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
