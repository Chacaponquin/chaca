import {
  IResolver,
  SchemaToResolve,
  SchemaInput,
  ResolverObject,
} from "../interfaces/schema.interface";

import { ChacaSchema } from "./ChacaSchema";
import { PrivateUtils } from "../helpers/PrivateUtils";
import { CustomFieldResolver } from "./Resolvers";

type OrderSchema<T> = {
  key: keyof T;
  schema: ResolverObject<T[keyof T]>;
};

export class SchemaResolver<K = any, T = any>
  extends ChacaSchema<K, T>
  implements IResolver<K>
{
  private schemaObj: SchemaToResolve<T>;

  constructor(inputObj: SchemaInput<K, T>) {
    super();
    this.schemaObj = this.validateObjectSchema(inputObj);
  }

  public *resolve(field: K): Generator<K> {
    let doc = {} as any;

    for (const o of this.orderSchemasByPriority()) {
      let retValue: any;

      if (o.schema.isArray) {
        retValue = [] as unknown[];

        const limit = PrivateUtils.intNumber({
          min: o.schema.isArray.min,
          max: o.schema.isArray.max,
        });

        for (let i = 1; i <= limit; i++) {
          retValue.push(this.resolveSchema(doc, o.schema));
        }
      } else {
        retValue = this.resolveSchema(doc, o.schema);
      }

      if (o.schema.posibleNull) {
        let porcentNull: number = o.schema.posibleNull;
        let array = new Array(100).fill(0);

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

      yield doc;
    }

    return doc;
  }

  public generate(cantDocuments: number): K[] {
    const cantDoc =
      typeof cantDocuments === "number" && cantDocuments > 0
        ? cantDocuments
        : 10;

    let returnArray = [] as K[];
    for (let i = 1; i <= cantDoc; i++) {
      let object = {} as K;
      const gen = this.resolve(object);

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

  private orderSchemasByPriority(): Array<OrderSchema<T>> {
    let headSchemas: Array<OrderSchema<T>> = [];
    let finalSchemas: Array<OrderSchema<T>> = [];

    for (const k of Object.keys(this.schemaObj)) {
      const key = k as keyof T;
      const schema = this.schemaObj[key] as ResolverObject<T[keyof T]>;
      if (schema.type instanceof CustomFieldResolver) {
        finalSchemas.push({ key, schema });
      } else {
        headSchemas.push({ key, schema });
      }
    }

    return [...headSchemas, ...finalSchemas];
  }
}
