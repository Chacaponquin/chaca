import { ChacaError } from "../../errors/ChacaError";
import { SchemaField } from "../../schemas/SchemaField";
import { Export } from "../helpers/Export";

import { FileConfig } from "../interfaces/export.interface";
import {
  CommonSchema,
  CustomField,
  FieldSchemaConfig,
  ResolverObject,
  SchemaInput,
  SchemaToResolve,
} from "../interfaces/schema.interface";
import {
  CustomFieldResolver,
  EnumFielResolver,
  SchemaFieldResolver,
} from "./Resolvers";
import { SchemaResolver } from "./SchemaResolver";

export abstract class ChacaSchema<K, T> {
  /**
   * Generate an array of schema documents
   * @param cantDocuments number of documents that you want to create
   */
  public abstract generate(cantDocuments: number): K[];

  /**
   * Generate and export the schema documents
   * @param cantDocuments number of documents that you want to create
   * @param configFile Configuration of the file you want to export (name, location, format, etc.)
   * @returns Promise<string>
   */
  public async generateAndExport(
    cantDocuments: number,
    configFile: FileConfig,
  ): Promise<string> {
    const data = this.generate(cantDocuments);
    return await Export(data, configFile);
  }

  protected resolveSchema<T, R>(field: T, schema: ResolverObject<R>): R {
    let retValue: R = null as R;
    const gen = schema.type.resolve(field);

    let stop = false;
    while (!stop) {
      let result = gen.next();
      retValue = result.value as any;
      if (result.done) {
        stop = true;
      }
    }

    return retValue;
  }

  protected validateObjectSchema(obj: SchemaInput<K, T>): SchemaToResolve<T> {
    if (
      !obj ||
      (typeof obj === "object" && Array.isArray(obj)) ||
      Object.keys(obj).length === 0 ||
      obj instanceof Date
    )
      throw new ChacaError(
        "Your schema has to be an object with the fields descriptions",
      );
    else {
      let schemaToSave: SchemaToResolve<T> = {} as SchemaToResolve<T>;

      const defaultConfig: CommonSchema = {
        isArray: null,
        posibleNull: 0,
      };

      for (const k of Object.keys(obj)) {
        const key = k as keyof T;
        const schema = obj[key] as FieldSchemaConfig<K, T[keyof T]>;
        if (schema instanceof SchemaResolver) {
          schemaToSave = {
            ...schemaToSave,
            [key]: { type: schema, ...defaultConfig },
          };
        } else if (typeof schema === "function") {
          schemaToSave = {
            ...schemaToSave,
            [key]: {
              type: new CustomFieldResolver<K, T[keyof T]>(schema),
              ...defaultConfig,
            },
          };
        } else if (schema instanceof SchemaField) {
          schemaToSave = {
            ...schemaToSave,
            [key]: {
              type: new SchemaFieldResolver<K, T[keyof T]>(schema),
              ...defaultConfig,
            },
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
                      : new SchemaFieldResolver<K, T[keyof T]>(type),
                  ...defaultConfig,
                },
              };
            } else if (schema.enum) {
              schemaToSave = {
                ...schemaToSave,
                [key]: {
                  type: new EnumFielResolver<K, T[keyof T]>(
                    this.validateEnum(key, schema.enum),
                  ),
                  ...defaultConfig,
                },
              };
            } else if (schema.custom) {
              schemaToSave = {
                ...schemaToSave,
                [key]: {
                  type: new CustomFieldResolver<K, T[keyof T]>(
                    this.validateCustom(key, schema.custom),
                  ),
                  ...defaultConfig,
                },
              };
            } else {
              throw new ChacaError(
                `The field ${String(key)} dosen't have a resolve function`,
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
    key: keyof T,
    type: SchemaResolver<T[keyof T]> | SchemaField<T[keyof T], any>,
  ): SchemaResolver<T[keyof T]> | SchemaField<T[keyof T], any> {
    if (type instanceof SchemaResolver || type instanceof SchemaField) {
      return type;
    } else throw new ChacaError(`Invalid type for key ${String(key)}`);
  }

  private validateEnum(key: keyof T, array: T[keyof T][]): T[keyof T][] {
    if (Array.isArray(array)) {
      if (array.length > 0) {
        return array;
      } else
        throw new ChacaError(
          `For the field ${String(key)} you must provide some values to choce`,
        );
    } else {
      throw new ChacaError(
        `If the field ${String(
          key,
        )} is a enum type so this one muste be an array of values`,
      );
    }
  }

  private validateCustom(
    key: keyof T,
    custom: CustomField<K, T[keyof T]>,
  ): CustomField<K, T[keyof T]> {
    if (typeof custom === "function") {
      return custom;
    } else
      throw new ChacaError(
        `For the field ${String(key)}. The custom field must be a function`,
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
  ): { min: number; max: number } | null {
    let value: { min: number; max: number } | null = null;

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
      if (isArray) value = { min: 0, max: 10 };
      else value = null;
    } else if (
      typeof isArray === "object" &&
      !(isArray instanceof Date) &&
      !Array.isArray(isArray) &&
      isArray !== null
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
}
