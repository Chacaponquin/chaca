import { ChacaError, CyclicAccessDataError } from "../../errors";
import { DocumentTree, FieldNode } from "../result-tree/classes";
import { SchemaResolver } from "../schema-resolver";
import { GetStoreValueConfig } from "./interfaces/store";

export class SchemaStore {
  constructor(private schemas: SchemaResolver[]) {}

  private validateFieldToGet(route: string): string[] {
    if (typeof route === "string") {
      const routeArray = route.split(".");
      return routeArray;
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
    route: string,
    config: GetStoreValueConfig,
  ): Array<FieldNode | DocumentTree<D>> {
    const routeArray = this.validateFieldToGet(route);

    let foundSchema = false;
    let values = [] as Array<FieldNode | DocumentTree<D>>;

    for (let i = 0; i < this.schemas.length && !foundSchema; i++) {
      const currentSchema = this.schemas[i];

      if (currentSchema.getSchemaName() === routeArray[0]) {
        if (currentSchema !== config.omitResolver) {
          if (!currentSchema.dangerCyclic()) {
            currentSchema.buildTrees();
          } else {
            throw new CyclicAccessDataError(
              `You are trying to access '${currentSchema.getSchemaName()}' when this one is being created`,
            );
          }
        }

        values = currentSchema.getAllValuesByRoute(routeArray.slice(1), config);

        foundSchema = true;
      }
    }

    return values;
  }
}
