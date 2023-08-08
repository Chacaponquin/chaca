import {
  ChacaError,
  CyclicAccessDataError,
} from "../../../errors/ChacaError.js";
import { DocumentTree, FieldNode } from "../ChacaResultTree/classes/index.js";
import { SchemaResolver } from "../SchemaResolver/SchemaResolver.js";
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

  public getResolverByIndex(index: number) {
    return this.schemas[index];
  }

  public setInjectedSchemas(array: Array<SchemaResolver>): void {
    this.schemas = array;
  }

  public getSchemasResolvers() {
    return this.schemas;
  }

  public getValue<D = any>(
    fieldToGet: string,
    config: GetStoreValueConfig,
  ): Array<FieldNode | DocumentTree<D>> {
    const fieldToGetArray = this.validateFieldToGet(fieldToGet);

    let foundSchema = false;
    let values = [] as Array<FieldNode | DocumentTree<D>>;

    for (let i = 0; i < this.schemas.length && !foundSchema; i++) {
      const currentSchema = this.schemas[i];

      if (currentSchema.getSchemaName() === fieldToGetArray[0]) {
        if (currentSchema !== config.omitResolver) {
          if (!currentSchema.dangerCyclic()) {
            currentSchema.buildTrees();
          } else {
            throw new CyclicAccessDataError(
              `You are trying to access '${currentSchema.getSchemaName()}' when this one is being created`,
            );
          }
        }

        values = currentSchema.getAllValuesByRoute(
          fieldToGetArray.slice(1),
          config,
        );

        foundSchema = true;
      }
    }

    return values;
  }
}
