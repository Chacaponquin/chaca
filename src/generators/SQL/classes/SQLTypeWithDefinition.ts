import { SQLType } from "./SQLType.js";

export abstract class SQLTypeWithDefinition extends SQLType {
  public abstract getSQLDefinition(): string;
  public abstract getSQLValue(): string;
}
