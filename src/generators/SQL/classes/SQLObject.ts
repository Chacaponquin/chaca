import { SQLType } from "./SQLType.js";

export class SQLObject extends SQLType {
  private objectFields: Array<SQLType> = [];

  constructor(fieldName: string, docRoute: Array<string>) {
    super(fieldName, docRoute);
  }

  public insertSubField(field: SQLType): void {
    this.objectFields.push(field);
  }
}
