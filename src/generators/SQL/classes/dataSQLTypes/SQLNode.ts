import { SQLArray } from "./SQLArray.js";
import { SQLNull } from "./SQLNull.js";
import { SQLObject } from "./SQLObject.js";
import { SQLTable } from "../table/SQLTable.js";
import { SQLTableColumn } from "../table/SQLTableColumn.js";
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
    parentTable: SQLTable,
    tables: Array<SQLTable>,
  ): void {
    const nodeType = this.getValueType();

    if (nodeType instanceof SQLObject) {
      const newColumn = nodeType.createTableColumn(this.getFieldName(), tables);
      parentTable.insertColumn(newColumn);
    } else if (nodeType instanceof SQLArray) {
      nodeType.createTableColumn(this.getFieldName(), parentTable, tables);
    } else {
      const newColumn = new SQLTableColumn(this.getFieldName());
      parentTable.insertColumn(newColumn);

      newColumn.insertAllRowValues(this.getValues());
    }
  }

  public getFieldRoute() {
    return this.fieldRoute;
  }

  public getFieldName() {
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

  public getValueType(): SQLType {
    const allValuesAreNull =
      this.values.filter((v) => v instanceof SQLNull).length ===
      this.values.length;

    if (allValuesAreNull) {
      return this.values[0];
    } else {
      return this.values.find((v) => !(v instanceof SQLNull)) as SQLType;
    }
  }

  public equal(otherNode: SQLNode): boolean {
    const otherNodeType = otherNode.getValueType();
    const thisValueType = this.getValueType();

    return (
      otherNode.canBeNull() ||
      this.canBeNull() ||
      thisValueType.equal(otherNodeType)
    );
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
