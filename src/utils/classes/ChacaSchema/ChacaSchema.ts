import { ChacaError } from "../../../errors/ChacaError.js";
import { SchemaField } from "../../../schemas/SchemaField.js";
import { Export } from "../../helpers/Export.js";
import { PrivateUtils } from "../../helpers/PrivateUtils.js";

import { FileConfig } from "../../interfaces/export.interface.js";
import {
  CommonSchema,
  CustomField,
  FieldSchemaConfig,
  SchemaInput,
  SchemaToResolve,
} from "../../interfaces/schema.interface.js";
import {
  CustomFieldResolver,
  EnumFieldResolver,
  MixedFieldResolver,
  RefFieldResolver,
  SchemaFieldResolver,
} from "../Resolvers/index.js";
import { SchemaResolver } from "../SchemaResolver.js";
import { SequentialField } from "../SequentialField/SequentialField.js";

export class ChacaSchema<K = any, T = any> {
  private schemaObj: SchemaToResolve<T>;

  constructor(inputObj: SchemaInput<K, T>) {
    this.schemaObj = this.validateObjectSchema(inputObj);
  }

  public getSchemaObject() {
    return this.schemaObj;
  }

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

  protected validateObjectSchema(obj: SchemaInput<K, T>): SchemaToResolve<T> {
    if (!obj || (typeof obj === "object" && Array.isArray(obj))) {
      throw new ChacaError(
        "Your schema has to be an object with the fields descriptions",
      );
    } else {
      let schemaToSave = {} as SchemaToResolve<T>;

      const defaultConfig: CommonSchema = {
        isArray: null,
        posibleNull: 0,
      };

      for (const k of Object.keys(obj)) {
        const key = k as keyof T;
        const schema = obj[key] as FieldSchemaConfig<K, T[keyof T]>;

        if (schema instanceof ChacaSchema) {
          schemaToSave = {
            ...schemaToSave,
            [key]: { type: new MixedFieldResolver(schema), ...defaultConfig },
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
              type: new SchemaFieldResolver(schema),
              ...defaultConfig,
            },
          };
        } else if (schema instanceof RefFieldResolver) {
          schemaToSave = {
            ...schemaToSave,
            [key]: {
              type: schema,
              ...defaultConfig,
            },
          };
        } else if (schema instanceof SequentialField) {
          schemaToSave = { ...schemaToSave, [key]: schema };
        } else {
          if (typeof schema === "object" && schema !== null) {
            if (schema.type) {
              const type = this.validateType(key, schema.type);
              schemaToSave = {
                ...schemaToSave,
                [key]: {
                  type:
                    type instanceof ChacaSchema
                      ? new MixedFieldResolver(type)
                      : new SchemaFieldResolver(type),
                  ...defaultConfig,
                },
              };
            } else if (schema.enum) {
              schemaToSave = {
                ...schemaToSave,
                [key]: {
                  type: new EnumFieldResolver<T[keyof T]>(
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
            } else if (schema.ref) {
              if (schema.ref instanceof RefFieldResolver) {
                schemaToSave = {
                  ...schemaToSave,
                  [key]: {
                    type: schema.ref,
                    ...defaultConfig,
                  },
                };
              } else {
                throw new ChacaError("Incorrect type for the ref field");
              }
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
    type: ChacaSchema<T[keyof T]> | SchemaField<T[keyof T], any>,
  ): ChacaSchema<T[keyof T]> | SchemaField<T[keyof T], any> {
    if (type instanceof ChacaSchema || type instanceof SchemaField) {
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
      value = pos ? 50 : 0;
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
      const min =
        typeof isArray["min"] === "number" && isArray["min"] > 0
          ? isArray["min"]
          : 1;
      const max =
        typeof isArray["max"] === "number" && isArray["max"] > min
          ? isArray["max"]
          : min + 9;

      value = { min, max };
    }

    return value;
  }

  /**
   * Generate a schema document
   */
  public generateObject(): K {
    const schemaToResolve = new SchemaResolver<K, T>(
      PrivateUtils.id(),
      this.schemaObj,
      1,
    );
    return schemaToResolve.resolve()[0];
  }

  /**
   * Generate an array of schema documents
   * @param cantDocuments number of documents that you want to create
   */
  public generate(cantDocuments: number): K[] {
    const schemaToResolve = new SchemaResolver<K, T>(
      PrivateUtils.id(),
      this.schemaObj,
      cantDocuments,
    );

    return schemaToResolve.resolve();
  }
}
