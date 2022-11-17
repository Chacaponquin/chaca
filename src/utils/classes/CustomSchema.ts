import { SchemaInput } from "../interfaces/schema.interface.js";
import { Schema } from "./Schema.js";
import { ChacaError } from "../../errors/ChacaError.js";
import { ChacaSchema } from "./ChacaSchema.js";
import { SchemaResolver } from "./Resolvers.js";

/**
 * Class for creation of a model with the configuration of each
 * field defined by the user
 */
export class CustomSchema<K = any, T = any> extends ChacaSchema<K, T> {
  private rootSchema: Schema<K, T>;

  constructor(
    public readonly schemaName: string,
    schemaObj: SchemaInput<K, T>,
  ) {
    super();
    if (!schemaName || !(typeof schemaName === "string")) {
      throw new ChacaError("Your Schema must have a name");
    }
    this.rootSchema = new Schema(schemaObj);
  }

  public generate(cantDocuments: number): K[] {
    const cantDoc =
      typeof cantDocuments === "number" && cantDocuments > 0
        ? cantDocuments
        : 10;

    const returnArray = [] as K[];
    for (let i = 1; i <= cantDoc; i++) {
      returnArray.push(
        new SchemaResolver(this.rootSchema.getSchemaObject()).resolve(),
      );
    }

    return returnArray;
  }
}
