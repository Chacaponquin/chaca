import { SQLNode } from "./SQLNode.js";
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
