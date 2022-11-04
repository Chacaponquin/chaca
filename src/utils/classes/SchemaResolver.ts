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
  private currentObjectCreated: { [path: string]: any } | null = null;

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

  private validateObjectSchema(
    obj: SchemaObject<SchemaConfig>,
  ): SchemaObject<SchemaToResolve> {
    if (
      !obj ||
      (typeof obj === "object" && Array.isArray(obj)) ||
      Object.keys(obj).length === 0 ||
      obj instanceof Date
    )
      throw new CHDataError(
        "Your schema has to be an object with the fields descriptions",
      );
    else {
      let schemaToSave: SchemaObject<SchemaToResolve> = {};

      const defaultConfig: CommonSchema = {
        isArray: null,
        posibleNull: 0,
      };

      for (const [key, schema] of Object.entries(obj)) {
        if (schema instanceof SchemaResolver) {
          schemaToSave = {
            ...schemaToSave,
            [key]: { type: schema, ...defaultConfig },
          };
        } else if (typeof schema === "function") {
          schemaToSave = {
            ...schemaToSave,
            [key]: { type: new CustomFieldResolver(schema), ...defaultConfig },
          };
        } else if (schema instanceof SchemaField) {
          schemaToSave = {
            ...schemaToSave,
            [key]: { type: new SchemaFieldResolver(schema), ...defaultConfig },
          };
        } else {
          if (
            typeof schema === "object" &&
            schema !== null &&
            !(schema instanceof Date)
          ) {
            if (schema.type) {
              const type = this.validateType(key, schema.type);
              schemaToSave = {
                ...schemaToSave,
                [key]: {
                  type:
                    type instanceof SchemaResolver
                      ? type
                      : new SchemaFieldResolver(type),
                  ...defaultConfig,
                },
              };
            } else if (schema.enum) {
              schemaToSave = {
                ...schemaToSave,
                [key]: {
                  type: new EnumFielResolver(
                    this.validateEnum(key, schema.enum),
                  ),
                  ...defaultConfig,
                },
              };
            } else if (schema.custom) {
              schemaToSave = {
                ...schemaToSave,
                [key]: {
                  type: new CustomFieldResolver(
                    this.validateCustom(key, schema.custom),
                  ),
                  ...defaultConfig,
                },
              };
            } else {
              throw new CHDataError(
                `The field ${key} dosen't have a resolve function`,
              );
            }
          }

          if (schema.posibleNull) {
            schemaToSave = {
              ...schemaToSave,
              [key]: {
                ...schemaToSave[key],
                posibleNull: this.validatePosibleNull(schema.posibleNull),
              },
            };
          }

          if (schema.isArray) {
            schemaToSave = {
              ...schemaToSave,
              [key]: {
                ...schemaToSave[key],
                isArray: this.validateIsArray(schema.isArray),
              },
            };
          }
        }
      }

      return schemaToSave;
    }
  }

  private validateType(
    key: string,
    type: SchemaResolver | SchemaField,
  ): SchemaResolver | SchemaField {
    if (type instanceof SchemaResolver || type instanceof SchemaField) {
      return type;
    } else throw new CHDataError(`Invalid type for key ${key}`);
  }

  private validateEnum(key: string, array: unknown[]): unknown[] {
    if (Array.isArray(array)) {
      if (array.length > 0) {
        return array;
      } else
        throw new CHDataError(
          `For the field ${key} you must provide some values to choce`,
        );
    } else {
      throw new CHDataError(
        `If the field ${key} is a enum type so this one muste be an array of values`,
      );
    }
  }

  private validateCustom(key: string, custom: CustomField): CustomField {
    if (typeof custom === "function") {
      return custom;
    } else
      throw new CHDataError(
        `For the field ${key}. The custom field must be a function`,
      );
  }

  private validatePosibleNull(pos: boolean | number): number {
    let value: number;

    if (typeof pos === "number") {
      value = pos <= 100 && pos >= 0 ? pos : 50;
    } else {
      value = Boolean(pos) ? 50 : 0;
    }

    return value;
  }

  private validateIsArray(
    isArray: boolean | number | { min?: number; max?: number },
  ): { min: number; max: number } {
    let value = {
      min: 0,
      max: 10,
    };

    if (typeof isArray === "number") {
      if (isArray >= 1) {
        value = {
          min: isArray,
          max: isArray,
        };
      } else {
        value = {
          min: 10,
          max: 10,
        };
      }
    } else if (typeof isArray === "boolean") {
      value = { min: 0, max: 10 };
    } else if (
      typeof isArray === "object" &&
      !(isArray instanceof Date) &&
      !Array.isArray(isArray)
    ) {
      let min =
        typeof isArray["min"] === "number" && isArray["min"] > 0
          ? isArray["min"]
          : 1;
      let max =
        typeof isArray["max"] === "number" && isArray["max"] > min
          ? isArray["max"]
          : min + 9;

      value = { min, max };
    }

    return value;
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
