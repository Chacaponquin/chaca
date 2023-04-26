import { SQLType } from "./SQLType.js";

export class SQLTreeNode {
  private fieldName: string;
  private values: Array<SQLType> = [];

  constructor(fieldName: string, firstValue: SQLType) {
    this.fieldName = fieldName;
    this.values = [firstValue];
  }

  public getFieldName() {
    return this.fieldName;
  }

  public insertValue(value: SQLType): void {
    this.values.push(value);
  }
}
