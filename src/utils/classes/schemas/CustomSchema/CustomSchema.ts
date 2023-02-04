import { SchemaInput } from "../../../interfaces/schema.interface.js";
import { Schema } from "../Schema/Schema.js";
import { ChacaError } from "../../../../errors/ChacaError.js";
import { ChacaSchema } from "../ChacaSchema/ChacaSchema.js";
import { SchemaResolver } from "../../SchemaResolver.js";

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
    let numberCant = 10;

    if (typeof cantDocuments === "number") {
      if (cantDocuments >= 0 && cantDocuments <= 500) {
        numberCant = cantDocuments;
      } else if (cantDocuments < 0) {
        throw new ChacaError(
          `You can not generate a negative number of documents`,
        );
      } else if (cantDocuments > 500) {
        throw new ChacaError(`You can not generate too much documents`);
      }
    }

    const schemaToResolve = new SchemaResolver<K, T>(
      this.rootSchema.getSchemaObject(),
    );

    return schemaToResolve.resolve(numberCant);
  }
}
