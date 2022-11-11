import {
  IResolver,
  SchemaObject,
  SchemaToResolve,
  SchemaConfig,
} from "../interfaces/schema.interface";

import { ChacaSchema } from "./ChacaSchema";
import { PrivateUtils } from "../helpers/PrivateUtils";
import { CustomFieldResolver } from "./Resolvers";

type OrderSchema = {
  key: string;
  schema: SchemaToResolve;
};

export class SchemaResolver extends ChacaSchema implements IResolver {
  private schemaObj: SchemaObject<SchemaToResolve>;

  constructor(schemaObj: SchemaObject<SchemaConfig>) {
    super();
    this.schemaObj = this.validateObjectSchema(schemaObj);
  }

  private orderSchemasByPriority(): Array<OrderSchema> {
    let headSchemas: Array<OrderSchema> = [];
    let finalSchemas: Array<OrderSchema> = [];

    for (const [key, schema] of Object.entries(this.schemaObj)) {
      if (schema.type instanceof CustomFieldResolver) {
        finalSchemas.push({ key, schema });
      } else {
        headSchemas.push({ key, schema });
      }
    }

    return [...headSchemas, ...finalSchemas];
  }

  public *resolve(field: any): Generator<any, unknown> {
    let doc: { [key: string]: any } = {};

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

  public generate(cantDocuments: number): any[] {
    const cantDoc =
      typeof cantDocuments === "number" && cantDocuments > 0
        ? cantDocuments
        : 10;

    let returnArray = [] as any[];
    for (let i = 1; i <= cantDoc; i++) {
      let object: unknown = {};
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
}
