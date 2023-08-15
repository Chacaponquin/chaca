import { ChacaError } from "../../../../../../errors/ChacaError.js";
import { IdSchema } from "../../../../../../schemas/id/IdSchema.js";
import { SQLType, SQLNumber, SQLIntegerNumber } from "../sqlTypes/index.js";
import { ColumnForeignKeyConfig, SQLTableColumn } from "./SQLTableColumn.js";

export class SQLTable {
  private columns: Array<SQLTableColumn> = [];
  private hasGeneratedID = false;
  private finishBuild = false;

  constructor(public readonly tableName: string) {}

  public generateIDColumn(): void {
    const idColumn = new SQLTableColumn(new IdSchema().uuid().getValue());
    idColumn.changeToPrimaryKey();

    this.hasGeneratedID = true;
    this.columns.push(idColumn);
  }

  public getSQLTableName(): string {
    return this.tableName.trim().replace(" ", "_");
  }

  public addForeignKey(
    columnName: string,
    config: ColumnForeignKeyConfig,
  ): void {
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

  public setInitBuild(): void {
    this.finishBuild = false;
  }

  public setFinishBuild(): void {
    this.finishBuild = true;
  }

  public finish() {
    return this.finishBuild;
  }

  public addPrimaryColumn(columnName: string): void {
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

  public updateIdColumnName(): void {
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

  public getColumns() {
    return this.columns;
  }

  public getLastID(): SQLNumber {
    return this.getPrimaryKeyColumn().getLastRow() as SQLNumber;
  }

  public findColumnByName(columnName: string): SQLTableColumn | null {
    return this.columns.find((c) => c.getColumnName() === columnName) || null;
  }

  public getTableMatrixData(): Array<Array<SQLType>> {
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

  public getTableLenght(): number {
    if (this.columns.length) {
      return this.columns[0].getColumnLenght();
    } else {
      return 0;
    }
  }

  public getPrimaryKeyColumn(): SQLTableColumn {
    const primaryColumn = this.columns.find((c) => c.isPrimaryKey());

    if (primaryColumn) {
      return primaryColumn;
    } else {
      throw new ChacaError(
        `The table '${this.tableName}' not has primary key column`,
      );
    }
  }

  public changeColumnToForeignKey(
    columnName: string,
    config: ColumnForeignKeyConfig,
  ) {
    const foundColumn = this.columns.find(
      (c) => c.getColumnName() === columnName,
    );

    if (foundColumn) {
      foundColumn.changeForeignKeyConfig(config);
    }
  }

  public addColumnValue(columnName: string, value: SQLType): void {
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

  public addNewID(): void {
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
