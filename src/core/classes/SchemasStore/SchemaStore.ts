import { ChacaError } from "../../../errors/ChacaError.js";
import { SchemaResolver } from "../SchemaResolver.js";

export class SchemaStore {
  private schemas: Array<SchemaResolver>;

  constructor(schemas: Array<SchemaResolver>) {
    this.schemas = schemas;
  }

  private validateFieldToGet(fieldToGet: string): Array<string> {
    if (typeof fieldToGet === "string") {
      const fieldToGetArray = fieldToGet.split(".");
      return fieldToGetArray;
    } else {
      throw new ChacaError(
        "The field to get must be an array separated by points",
      );
    }
  }

  public setInjectedSchemas(array: Array<SchemaResolver>): void {
    this.schemas = array;
  }

  public getValue<R = any>(fieldToGet: string): Array<R> {
    const fieldToGetArray = this.validateFieldToGet(fieldToGet);

    let values = [] as Array<R>;

    for (let i = 0; i < this.schemas.length; i++) {
      // build tree if not created yet
      // this.schemas[i].buildTrees();

      if (this.schemas[i].getSchemaName() === fieldToGetArray[0]) {
        values = this.schemas[i].getAllValuesByRoute(
          fieldToGetArray.slice(1),
        ) as Array<R>;
      }
    }

    return values;
  }
}