import {
  SchemaToResolve,
  SchemaInput,
} from "../interfaces/schema.interface.js";

import { ChacaSchema } from "./ChacaSchema.js";

import { SchemaResolver } from "./Resolvers.js";

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
    const cantDoc =
      typeof cantDocuments === "number" && cantDocuments > 0
        ? cantDocuments
        : 10;

    const returnArray = [] as K[];
    for (let i = 1; i <= cantDoc; i++) {
      returnArray.push(new SchemaResolver(this.schemaObj).resolve());
    }

    return returnArray;
  }
}
