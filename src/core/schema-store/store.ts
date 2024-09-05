import { ChacaError, CyclicAccessDataError } from "../../errors";
import { DocumentTree, FieldNode } from "../result-tree/classes";
import { SchemaResolver } from "../schema-resolver";
import { GetStoreValueConfig } from "./interfaces/store";

export class SchemaStore {
  private schemas: SchemaResolver[];

  constructor(schemas: SchemaResolver[]) {
    this.schemas = schemas;
  }

  private validateFieldToGet(fieldToGet: string): string[] {
    if (typeof fieldToGet === "string") {
      const fieldToGetArray = fieldToGet.split(".");
      return fieldToGetArray;
    } else {
      throw new ChacaError(
        "The field to get must be an array separated by points",
      );
    }
  }

  getResolverByIndex(index: number) {
    return this.schemas[index];
  }

  setInjectedSchemas(array: SchemaResolver[]): void {
    this.schemas = array;
  }

  getSchemasResolvers() {
    return this.schemas;
  }

  value<D = any>(
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
