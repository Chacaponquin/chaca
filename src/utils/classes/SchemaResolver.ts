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
  key: string;
  schema: ResolverObject<T>;
};

export class SchemaResolver<T = any>
  extends ChacaSchema<T>
  implements IResolver<T>
{
  private schemaObj: SchemaToResolve<T>;

  constructor(inputObj: SchemaInput<T>) {
    super();
    this.schemaObj = this.validateObjectSchema(inputObj);
  }

  public *resolve(field: T): Generator<any, unknown> {
    let doc = {} as T;

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

  public generate(cantDocuments: number): T[] {
    const cantDoc =
      typeof cantDocuments === "number" && cantDocuments > 0
        ? cantDocuments
        : 10;

    let returnArray = [] as any[];
    for (let i = 1; i <= cantDoc; i++) {
      let object = {} as T;
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

    for (const key of Object.keys(this.schemaObj)) {
      const schema = this.schemaObj[key as keyof T] as ResolverObject<T>;
      if (schema.type instanceof CustomFieldResolver) {
        finalSchemas.push({ key, schema });
      } else {
        headSchemas.push({ key, schema });
      }
    }

    return [...headSchemas, ...finalSchemas];
  }
}
