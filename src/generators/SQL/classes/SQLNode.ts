import { SQLArray } from "./SQLArray.js";
import { SQLNull } from "./SQLNull.js";
import { SQLObject } from "./SQLObject.js";
import { SQLTable } from "./SQLTable.js";
import { SQLTableColumn } from "./SQLTableColumn.js";
import { SQLType } from "./SQLType.js";

export class SQLNode {
  private fieldRoute: Array<string>;
  private values: Array<SQLType> = [];
  private isNull = false;

  constructor(fieldRoute: Array<string>, firstValue: SQLType) {
    this.fieldRoute = fieldRoute;
    this.values = [firstValue];

    if (firstValue instanceof SQLNull) {
      this.changeIsNull();
    }
  }

  public getValues() {
    return this.values;
  }

  public createTableColumn(
    currentTable: SQLTable,
    tables: Array<SQLTable>,
  ): void {
    const nodeType = this.getValueType();

    if (nodeType instanceof SQLObject) {
      const newColumn = nodeType.createTableColumn(this.getFieldName(), tables);
      currentTable.insertColumn(newColumn);
    } else if (nodeType instanceof SQLArray) {
      nodeType.createTableColumn(this.getFieldName(), currentTable, tables);
    } else {
      const newColumn = new SQLTableColumn(
        this.getFieldName(),
        this.canBeNull(),
      );
      currentTable.insertColumn(newColumn);
    }
  }

  public getFieldRoute() {
    return this.fieldRoute;
  }

  private getFieldName() {
    return this.fieldRoute[this.fieldRoute.length - 1];
  }

  public changeIsNull() {
    this.isNull = true;
  }

  public canBeNull() {
    return this.isNull;
  }

  public insertValue(value: SQLType): void {
    this.values.push(value);
  }

  public getFirstValue(): SQLType {
    return this.values[0];
  }

  public getValueType() {
    return this.values[0];
  }

  public equal(otherNode: SQLNode): boolean {
    return this.getValueType().equal(otherNode.getValueType());
  }

  public foundNode(otherFieldRoute: Array<string>): null | SQLNode {
    if (this.fieldRoute.length === otherFieldRoute.length) {
      let contEqualRoute = 0;

      for (
        let i = 0;
        i < this.fieldRoute.length && contEqualRoute < this.fieldRoute.length;
        i++
      ) {
        if (otherFieldRoute[i] === this.fieldRoute[i]) {
          contEqualRoute++;
        }
      }

      if (contEqualRoute === this.fieldRoute.length) {
        return this;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }
}
