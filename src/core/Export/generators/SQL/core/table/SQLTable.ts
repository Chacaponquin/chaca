import { ChacaError } from "../../../../../../errors";
import { IdModule } from "../../../../../../modules/id";
import { SQLType, SQLNumber, SQLIntegerNumber } from "../sql-types";
import { ColumnForeignKeyConfig, SQLTableColumn } from "./SQLTableColumn";

export class SQLTable {
  private columns: SQLTableColumn[] = [];
  private hasGeneratedID = false;
  private finishBuild = false;

  constructor(readonly tableName: string) {}

  generateIDColumn(): void {
    const idColumn = new SQLTableColumn(new IdModule().uuid());
    idColumn.changeToPrimaryKey();

    this.hasGeneratedID = true;
    this.columns.push(idColumn);
  }

  getSQLTableName(): string {
    return this.tableName.trim().replace(" ", "_");
  }

  addForeignKey(columnName: string, config: ColumnForeignKeyConfig): void {
    const foundColumn = this.columns.find(
      (c) => c.getColumnName() === columnName,
    );

    if (foundColumn) {
      foundColumn.changeForeignKeyConfig(config);
    } else {
      const newColumn = new SQLTableColumn(columnName);
      newColumn.changeForeignKeyConfig(config);

      this.columns.push(newColumn);
    }
  }

  setInitBuild(): void {
    this.finishBuild = false;
  }

  setFinishBuild(): void {
    this.finishBuild = true;
  }

  finish() {
    return this.finishBuild;
  }

  addPrimaryColumn(columnName: string): void {
    const foundColumn = this.columns.find(
      (c) => c.getColumnName() === columnName,
    );

    if (foundColumn) {
      foundColumn.changeToPrimaryKey();
    } else {
      const newColumn = new SQLTableColumn(columnName);
      newColumn.changeToPrimaryKey();

      this.columns.push(newColumn);
    }
  }

  updateIdColumnName(): void {
    if (this.hasGeneratedID) {
      this.checkAndChangeIDColumnName("id");
    }
  }

  private checkAndChangeIDColumnName(newColumnName: string): void {
    const newName = newColumnName;

    const foundSameName = this.columns
      .slice(1)
      .some((c) => c.getColumnName() === newName);

    if (foundSameName) {
      this.checkAndChangeIDColumnName(newName + "_1");
    } else {
      this.columns[0].changeColumnName(newName);
    }
  }

  getColumns() {
    return this.columns;
  }

  getLastID(): SQLNumber {
    return this.getPrimaryKeyColumn().getLastRow() as SQLNumber;
  }

  findColumnByName(columnName: string): SQLTableColumn | null {
    return this.columns.find((c) => c.getColumnName() === columnName) || null;
  }

  getTableMatrixData(): Array<Array<SQLType>> {
    const matrix = [] as Array<Array<SQLType>>;
    const rowCount = this.getTableLenght();

    for (let i = 0; i < rowCount; i++) {
      matrix.push(this.columns.map((c) => c.getValueByRowIndex(i)));
    }

    return matrix;
  }

  private addColumn(columnName: string) {
    this.columns.push(new SQLTableColumn(columnName));
  }

  getTableLenght(): number {
    if (this.columns.length) {
      return this.columns[0].getColumnLenght();
    } else {
      return 0;
    }
  }

  getPrimaryKeyColumn(): SQLTableColumn {
    const primaryColumn = this.columns.find((c) => c.isPrimaryKey());

    if (primaryColumn) {
      return primaryColumn;
    } else {
      throw new ChacaError(
        `The table '${this.tableName}' not has primary key column`,
      );
    }
  }

  changeColumnToForeignKey(columnName: string, config: ColumnForeignKeyConfig) {
    const foundColumn = this.columns.find(
      (c) => c.getColumnName() === columnName,
    );

    if (foundColumn) {
      foundColumn.changeForeignKeyConfig(config);
    }
  }

  addColumnValue(columnName: string, value: SQLType): void {
    const foundColumn = this.columns.find(
      (c) => c.getColumnName() === columnName,
    );

    if (foundColumn) {
      foundColumn.insertValue(value);
    } else {
      this.addColumn(columnName);
      this.addColumnValue(columnName, value);
    }
  }

  addNewID(): void {
    if (this.hasGeneratedID) {
      if (this.columns[0].getColumnLenght()) {
        const newID = new SQLIntegerNumber(this.getLastID().value + 1);
        this.columns[0].insertValue(newID);
      } else {
        const newID = new SQLIntegerNumber(1);
        this.columns[0].insertValue(newID);
      }
    }
  }
}
