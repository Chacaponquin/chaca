import { createPrimaryKey } from "../../utils/createPrimaryKey.js";
import { SQLNull } from "./SQLNull.js";
import { SQLTable } from "../table/SQLTable.js";
import { SQLTableColumn } from "../table/SQLTableColumn.js";
import { SQLType } from "./SQLType.js";
import { SQLObject } from "./SQLObject.js";

export class SQLArray extends SQLType {
  private values: Array<SQLType> = [];

  public equal(otherType: SQLType): boolean {
    if (otherType instanceof SQLArray) {
      const areEqual = this.getArrayType().equal(otherType.getArrayType());

      /*if (areEqual) {
        const thisValues = this.getValues();
        const otherValues = otherType.getValues();

        if (thisValues.length > otherValues.length) {
          const difference = thisValues.length - otherValues.length;

          for (let i = 0; i < difference; i++) {
            otherType.insertValue(new SQLNull());
          }
        } else if (thisValues.length < otherValues.length) {
          const difference = otherValues.length - thisValues.length;

          for (let i = 0; i < difference; i++) {
            this.insertValue(new SQLNull());
          }
        }
      }*/

      return areEqual;
    } else {
      return false;
    }
  }

  public getValues() {
    return this.values;
  }

  public insertValue(node: SQLType): void {
    this.values.push(node);
  }

  public getArrayType(): SQLType {
    if (this.values[0]) {
      return this.values[0];
    } else {
      return new SQLNull();
    }
  }

  private createParentIDColumnName(columnName: string): string {
    return `${columnName}_id`;
  }

  public createTableColumn(
    fieldName: string,
    parentTable: SQLTable,
    tables: Array<SQLTable>,
    allValues: Array<SQLArray>,
  ) {
    const newArrayTable = new SQLTable(fieldName);

    const idColumn = new SQLTableColumn("id");
    const valuesColumn = new SQLTableColumn("value");
    const parentIDColumn = new SQLTableColumn(
      this.createParentIDColumnName(parentTable.tableName),
    );

    // tipo de dato que contiene el array
    const arrayType = this.getArrayType();

    parentTable
      .getTablePrimaryKeyColumn()
      .getRows()
      .forEach((parentPK, parentIndex) => {
        allValues[parentIndex].values.forEach((value) => {
          // insertar id de la fila que se crea
          idColumn.insertRowValue(createPrimaryKey());

          if (value instanceof SQLObject) {
            const objectIDColumn = value.createTableColumn(fieldName, tables);

            // insertar id del padre
            parentIDColumn.insertRowValue(parentPK);

            console.log(allValues[parentIndex]);
          } else {
            // insertar id del padre
            parentIDColumn.insertRowValue(parentPK);

            // insertar valor
            valuesColumn.insertRowValue(value);
          }
        });
      });

    if (arrayType instanceof SQLObject) {
      const newColumn = arrayType.createTableColumn(fieldName, tables);

      newColumn.getRows().forEach((v) => {
        valuesColumn.insertRowValue(v);
      });

      newArrayTable.insertColumn(valuesColumn);
    } else if (arrayType instanceof SQLArray) {
      arrayType.createTableColumn(
        `${fieldName}_list`,
        newArrayTable,
        tables,
        arrayType.values as Array<SQLArray>,
      );
    }

    newArrayTable.insertColumn(idColumn);
    newArrayTable.insertColumn(parentIDColumn);
    newArrayTable.insertColumn(valuesColumn);

    tables.push(newArrayTable);
  }
}
