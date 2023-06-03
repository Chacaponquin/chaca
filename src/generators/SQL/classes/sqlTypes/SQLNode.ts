import { ChacaError } from "../../../../errors/ChacaError.js";
import { SQLTable } from "../table/SQLTable.js";

export class SQLNode {
  private tables: Array<SQLTable> = [];

  public addTable(table: SQLTable): void {
    this.tables.push(table);
  }

  public concatTables(otherNode: SQLNode): void {
    const otherTables = otherNode.tables;

    for (const table of this.tables) {
      const foundTable = otherTables.find(
        (t) => t.tableName === table.tableName,
      );

      if (foundTable) {
        table.concatColumns(foundTable);
      } else {
        throw new ChacaError(
          `The table ${table.tableName} does not exists in all objects`,
        );
      }
    }
  }
}
