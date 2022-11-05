import { CHDataUtils } from "../CHDataUtils";
import {
  IResolver,
  SchemaObject,
  SchemaToResolve,
  CommonSchema,
  CustomField,
  SchemaConfig,
} from "../interfaces/schema.interface";

import { CHDataError } from "../../errors/CHDataError";
import { SchemaField } from "../../schemas/SchemaField";

import {
  CustomFieldResolver,
  EnumFielResolver,
  SchemaFieldResolver,
} from "./Resolvers";

import { ChacaSchema } from "./ChacaSchema";

export class SchemaResolver extends ChacaSchema implements IResolver {
  private schemaObj: SchemaObject<SchemaToResolve>;

  constructor(schemaObj: SchemaObject<SchemaConfig>) {
    super();
    this.schemaObj = this.validateObjectSchema(schemaObj);
  }

  public *resolve(field: any): Generator<any, unknown> {
    let doc: { [key: string]: any } = {};

    for (const [key, schema] of Object.entries(this.schemaObj)) {
      let retValue: any;

      if (schema.isArray) {
        retValue = [] as unknown[];

        const limit = CHDataUtils.numberByLimits({
          min: schema.isArray.min,
          max: schema.isArray.max,
        });

        for (let i = 1; i <= limit; i++) {
          retValue.push(this.resolveSchema(doc, schema));
        }
      } else {
        retValue = this.resolveSchema(doc, schema);
      }

      if (schema.posibleNull) {
        let porcentNull: number = schema.posibleNull;
        let array = new Array(100).fill(0);

        for (let i = 0; i < array.length; i++) {
          if (porcentNull > 0) {
            array.push(null);
            porcentNull--;
          } else {
            array.push(retValue);
          }
        }

        retValue = CHDataUtils.oneOfArray(array);
      }

      doc = { ...doc, [key]: retValue };

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
