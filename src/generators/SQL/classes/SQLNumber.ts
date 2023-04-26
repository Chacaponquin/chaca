import { SQLType } from "./SQLType.js";

export class SQLNumber extends SQLType {
  constructor(value: number) {
    super(value);
  }
}
