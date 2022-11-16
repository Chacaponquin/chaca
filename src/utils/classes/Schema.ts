/* eslint @typescript-eslint/no-unused-vars: off */

import {
  IResolver,
  SchemaToResolve,
  SchemaInput,
  ResolverObject,
} from "../interfaces/schema.interface.js";

import { ChacaSchema } from "./ChacaSchema.js";
import { PrivateUtils } from "../helpers/PrivateUtils.js";
import { CustomFieldResolver } from "./Resolvers.js";

type OrderSchema<C, T> = {
  key: keyof T;
  schema: ResolverObject<C, T[keyof T]>;
};

export class Schema<K = any, T = any>
  extends ChacaSchema<K, T>
  implements IResolver<K, K>
{
  private schemaObj: SchemaToResolve<K, T>;

  constructor(inputObj: SchemaInput<K, T>) {
    super();
    this.schemaObj = this.validateObjectSchema(inputObj);
  }

  public *resolve(cont: K): Generator<K> {
    let doc = {} as K;
    let newCont = cont;

    for (const o of this.orderSchemasByPriority()) {
      let retValue: any;

      if (o.schema.isArray) {
        retValue = [] as any[];

        const limit = PrivateUtils.intNumber({
          min: o.schema.isArray.min,
          max: o.schema.isArray.max,
        });

        for (let i = 1; i <= limit; i++) {
          retValue.push(this.resolveSchema(newCont, o.schema));
        }
      } else {
        retValue = this.resolve(newCont, o.schema);
      }

      if (o.schema.posibleNull) {
        let porcentNull: number = o.schema.posibleNull;
        const array = new Array(100).fill(0);

        for (let i = 0; i < array.length; i++) {
          if (porcentNull > 0) {
            array.push(null);
            porcentNull--;
          } else {
            array.push(retValue);
          }
        }

        retValue = PrivateUtils.oneOfArray(array);
      }

      doc = { ...doc, [o.key]: retValue };
      newCont = { ...cont, ...doc };

      yield doc;
    }

    return doc;
  }

  public generate(cantDocuments: number): K[] {
    const cantDoc =
      typeof cantDocuments === "number" && cantDocuments > 0
        ? cantDocuments
        : 10;

    const returnArray = [] as K[];
    for (let i = 1; i <= cantDoc; i++) {
      let object = {} as K;
      const gen = this.resolve(object);

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
