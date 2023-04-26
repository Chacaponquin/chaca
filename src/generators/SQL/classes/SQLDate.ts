import { SQLType } from "./SQLType.js";

export class SQLDate extends SQLType {
  constructor(value: Date) {
    super(value);
  }
}
