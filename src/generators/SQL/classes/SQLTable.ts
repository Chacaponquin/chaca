import { SQLTableField } from "./SQLTableField.js";

export class SQLTable {
  private fields: Array<SQLTableField> = [];

  constructor(public readonly tableName: string) {}

  public insertField(field: SQLTableField) {
    this.fields.push(field);
  }
}
