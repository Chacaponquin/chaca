import { SchemaObject, SchemaConfig } from "../interfaces/schema.interface";
import { SchemaResolver } from "./SchemaResolver";
import { FileConfig } from "../interfaces/export.interface";
import { CHDataError } from "../../errors/CHDataError";
import { ChacaSchema } from "./ChacaSchema";

/**
 * Class for creation of a model with the configuration of each
 * field defined by the user
 */
export class CustomSchema extends ChacaSchema {
  private rootSchema: SchemaResolver;

  constructor(
    public readonly schemaName: string,
    schemaObj: SchemaObject<SchemaConfig>,
  ) {
    super();
    if (!schemaName || !(typeof schemaName === "string")) {
      throw new CHDataError("Your Schema must have a name");
    }
    this.rootSchema = new SchemaResolver(schemaObj);
  }

  public generate(cantDocuments: number): any[] {
    const cantDoc =
      typeof cantDocuments === "number" && cantDocuments > 0
        ? cantDocuments
        : 10;

    let returnArray = [] as any[];
    for (let i = 1; i <= cantDoc; i++) {
      let object: unknown = {};
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
