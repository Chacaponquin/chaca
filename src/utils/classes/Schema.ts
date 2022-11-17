/* eslint @typescript-eslint/no-unused-vars: off */

import {
  SchemaToResolve,
  SchemaInput,
  ResolverObject,
} from "../interfaces/schema.interface.js";

import { ChacaSchema } from "./ChacaSchema.js";

import { CustomFieldResolver, SchemaResolver } from "./Resolvers.js";

type OrderSchema<C, T> = {
  key: keyof T;
  schema: ResolverObject<C, T[keyof T]>;
};

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

  private orderSchemasByPriority(): Array<OrderSchema<K, T>> {
    const customSchemas: Array<OrderSchema<K, T>> = [];
    const normalSchemas: Array<OrderSchema<K, T>> = [];
    const nestedSchemas: Array<OrderSchema<K, T>> = [];

    for (const k of Object.keys(this.schemaObj)) {
      const key = k as keyof T;
      const schema = this.schemaObj[key] as ResolverObject<K, T[keyof T]>;
      if (schema.type instanceof CustomFieldResolver) {
        customSchemas.push({ key, schema });
      } else if (schema.type instanceof Schema) {
        nestedSchemas.push({ key, schema });
      } else {
        normalSchemas.push({ key, schema });
      }
    }

    return [...normalSchemas, ...customSchemas, ...nestedSchemas];
  }
}
