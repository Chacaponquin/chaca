import { ChacaError, CyclicAccessDataError } from "../../errors";
import { NodeRoute } from "../input-tree/core/node/value-object/route";
import { DocumentTree, FieldNode } from "../result-tree/classes";
import { SchemaResolver } from "../schema-resolver";
import { GetStoreValueConfig } from "./interfaces/store";

interface ValueProps {
  route: string;
  config: GetStoreValueConfig;
  caller: NodeRoute;
}

export class SchemaStore {
  constructor(private schemas: SchemaResolver[]) {}

  private validateFieldToGet(route: string, caller: string): string[] {
    if (typeof route !== "string") {
      throw new ChacaError(
        `From '${caller}'. The field to get must be an array separated by points`,
      );
    }

    return route.split(".");
  }

  get(index: number) {
    return this.schemas[index];
  }

  setInjectedSchemas(array: SchemaResolver[]): void {
    this.schemas = array;
  }

  getSchemasResolvers() {
    return this.schemas;
  }

  value<D = any>({
    caller,
    config,
    route,
  }: ValueProps): Array<FieldNode | DocumentTree<D>> {
    const routeArray = this.validateFieldToGet(route, caller.string());

    let foundSchema = false;
    let values = [] as Array<FieldNode | DocumentTree<D>>;

    for (let i = 0; i < this.schemas.length && !foundSchema; i++) {
      const currentSchema = this.schemas[i];

      if (currentSchema.getSchemaName() === routeArray[0]) {
        if (currentSchema === config.omitResolver) {
          throw new ChacaError(
            `From '${caller.string()}'. You are trying to access the documents of the current schema, if you want this use the store.currentDocuments method`,
          );
        }

        if (currentSchema.dangerCyclic()) {
          throw new CyclicAccessDataError(
            `From '${caller.string()}', you are trying to access '${currentSchema.getSchemaName()}' when this one is being created`,
          );
        }

        currentSchema.buildTrees(caller);

        values = currentSchema.getAllValuesByRoute(routeArray.slice(1), config);

        foundSchema = true;
      }
    }

    return values;
  }
}
