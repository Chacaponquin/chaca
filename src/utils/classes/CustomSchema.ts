import { SchemaInput } from "../interfaces/schema.interface";
import { SchemaResolver } from "./SchemaResolver";
import { ChacaError } from "../../errors/ChacaError";
import { ChacaSchema } from "./ChacaSchema";

/**
 * Class for creation of a model with the configuration of each
 * field defined by the user
 */
export class CustomSchema<T> extends ChacaSchema<T> {
  private rootSchema: SchemaResolver;

  constructor(public readonly schemaName: string, schemaObj: SchemaInput<T>) {
    super();
    if (!schemaName || !(typeof schemaName === "string")) {
      throw new ChacaError("Your Schema must have a name");
    }
    this.rootSchema = new SchemaResolver(schemaObj);
  }

  public generate(cantDocuments: number): T[] {
    const cantDoc =
      typeof cantDocuments === "number" && cantDocuments > 0
        ? cantDocuments
        : 10;

    let returnArray = [] as T[];
    for (let i = 1; i <= cantDoc; i++) {
      let object: T = {} as T;
      const gen = this.rootSchema.resolve(object);

      let stop = false;
      while (!stop) {
        let result = gen.next();
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
