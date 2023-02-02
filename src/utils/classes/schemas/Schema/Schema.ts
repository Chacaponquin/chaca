import {
  SchemaToResolve,
  SchemaInput,
} from "../../../interfaces/schema.interface.js";

import { ChacaSchema } from "../ChacaSchema/ChacaSchema.js";

import { SchemaResolver } from "../../Resolvers.js";
import { ChacaError } from "../../../../errors/ChacaError.js";

export class Schema<K = any, T = any> extends ChacaSchema<K, T> {
  private schemaObj: SchemaToResolve<K, T>;

  constructor(inputObj: SchemaInput<K, T>) {
    super();
    this.schemaObj = this.validateObjectSchema(inputObj);
  }

  public getSchemaObject() {
    return this.schemaObj;
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

    const returnArray = [] as K[];
    for (let i = 1; i <= numberCant; i++) {
      returnArray.push(new SchemaResolver(this.schemaObj).resolve());
    }

    return returnArray;
  }
}
