import { SchemaInput } from "../interfaces/schema.interface.js";
import { Schema } from "./Schema.js";
import { ChacaError } from "../../errors/ChacaError.js";
import { ChacaSchema } from "./ChacaSchema.js";

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
      let object = {} as K;
      const gen = this.rootSchema.resolve(object);

      let stop = false;
      while (!stop) {
        const result = gen.next();
        object = result.value;
        if (result.done) {
          stop = true;
        }
      }

      returnArray.push(object);
    }

    return returnArray;
  }
}
