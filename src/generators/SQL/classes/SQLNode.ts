import { SQLNull } from "./SQLNull.js";
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

  public getFieldRoute() {
    return this.fieldRoute;
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
