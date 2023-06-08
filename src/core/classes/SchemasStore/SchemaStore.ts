import { ChacaError } from "../../../errors/ChacaError.js";
import { SchemaResolver } from "../SchemaResolver.js";
import { GetStoreValueConfig } from "./interfaces/store.interface.js";

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

  private validateGetValueConfig(
    config?: GetStoreValueConfig,
  ): GetStoreValueConfig {
    let returnConfig: GetStoreValueConfig = {};

    if (config && typeof config === "object" && config !== null) {
      if (typeof config.where === "function") {
        const whereFunction = config.where;
        returnConfig = { ...config };
        returnConfig.where = whereFunction;
      }
    }

    return returnConfig;
  }

  public getValue<R = any>(
    fieldToGet: string,
    config?: GetStoreValueConfig,
  ): Array<R> {
    const getValueConfig = this.validateGetValueConfig(config);
    const fieldToGetArray = this.validateFieldToGet(fieldToGet);

    let values = [] as Array<R>;
    for (let i = 0; i < this.schemas.length; i++) {
      if (this.schemas[i].getSchemaName() === fieldToGetArray[0]) {
        values = this.schemas[i].getAllValuesByRoute(
          fieldToGetArray.slice(1),
          getValueConfig,
        ) as Array<R>;
      }
    }

    return values;
  }
}
