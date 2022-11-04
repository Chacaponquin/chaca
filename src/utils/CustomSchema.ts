import { CHDataError } from "../errors/CHDataError";
import { CHDataUtils } from "./CHDataUtils";
import {
  SchemaObject,
  SchemaConfig,
  CommonSchema,
  CustomField,
  IResolveSchema,
  SchemaToResolve,
  CustomFieldSchema,
  SchemaResolver,
  EnumFieldSchema,
} from "./interfaces/schema.interface";
import { FileConfig } from "./interfaces/export.interface";
import {
  CSVGenerator,
  Generator,
  JavascriptGenerator,
  JsonGenerator,
  JavaGenerator,
  TypescriptGenerator,
} from "../generators";
import { SchemaField } from "../schemas/SchemaField";

/**
 * Class for creation of a model with the configuration of each
 * field defined by the user
 */
export class CustomSchema implements IResolveSchema {
  private schemaObj: SchemaObject<SchemaToResolve>;
  private currentObjectCreated: { [path: string]: any } | null = null;

  constructor(schemaObj: SchemaObject<SchemaConfig>) {
    this.schemaObj = this.validateObjectSchema(schemaObj);
  }

  public generate(cantDocuments: number): any[] {
    const cantDoc =
      typeof cantDocuments === "number" && cantDocuments > 0
        ? cantDocuments
        : 10;

    let returnArray = [] as any[];

    for (let i = 1; i <= cantDoc; i++) {
      let doc: { [key: string]: any[] } = {};
      for (const [key, schema] of Object.entries(this.schemaObj)) {
        let retValue: any;

        if (schema.isArray) {
          retValue = [] as any[];

          const limit = CHDataUtils.numberByLimits({
            min: schema.isArray.min,
            max: schema.isArray.max,
          });

          for (let i = 1; i <= limit; i++)
            retValue.push(schema.type.resolve(this.currentObjectCreated));
        } else retValue = schema.type.resolve(this.currentObjectCreated);

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
        this.currentObjectCreated = doc;
      }

      returnArray.push(doc);
      this.currentObjectCreated = null;
    }

    return returnArray;
  }

  /**
   *
   * @param data Data you want to export
   * @param config Configuration of the file you want to export (name, location, format, etc.)
   *
   * @example
   * const data = [{id: '1664755445878', name: 'Alberto', age: 20}, {id: '1664755445812', name: 'Carolina', age: 28}]
   * const config = {fileName: 'Users', format: 'json', location: '../../data'}
   * await schema.export(data, config)
   *
   * @returns
   * Promise<void>
   */
  public async export(data: any, config: FileConfig): Promise<string> {
    if (config && typeof config.format === "string") {
      let gen: Generator;
      switch (config.format) {
        case "json":
          gen = new JsonGenerator(data, config);
          break;
        case "javascript":
          gen = new JavascriptGenerator(data, config);
          break;
        case "csv":
          gen = new CSVGenerator(data, config);
          break;
        case "java":
          gen = new JavaGenerator(data, config);
          break;
        case "typescript":
          gen = new TypescriptGenerator(data, config);
          break;
        default:
          throw new CHDataError(`Format ${config.format} invalid`);
      }

      return await gen.generateFile();
    } else throw new CHDataError(`Format ${config.format} invalid`);
  }

  public async generateAndExport(
    cant: number,
    configFile: FileConfig,
  ): Promise<void> {
    const data = this.generate(cant);
    await this.export(data, configFile);
  }

  public resolve(field: any): unknown {
    return false;
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
        if (schema instanceof CustomSchema) {
          schemaToSave = {
            ...schemaToSave,
            [key]: { type: schema, ...defaultConfig },
          };
        } else if (typeof schema === "function") {
          schemaToSave = {
            ...schemaToSave,
            [key]: { type: new CustomFieldSchema(schema), ...defaultConfig },
          };
        } else if (schema instanceof SchemaField) {
          schemaToSave = {
            ...schemaToSave,
            [key]: { type: new SchemaResolver(schema), ...defaultConfig },
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
                    type instanceof CustomSchema
                      ? type
                      : new SchemaResolver(type),
                  ...defaultConfig,
                },
              };
            } else if (schema.enum) {
              schemaToSave = {
                ...schemaToSave,
                [key]: {
                  type: new EnumFieldSchema(
                    this.validateEnum(key, schema.enum),
                  ),
                  ...defaultConfig,
                },
              };
            } else if (schema.custom) {
              schemaToSave = {
                ...schemaToSave,
                [key]: {
                  type: new CustomFieldSchema(
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
                posibleNull: this.validatePosibleNull(key, schema.posibleNull),
              },
            };
          }

          if (schema.isArray) {
            schemaToSave = {
              ...schemaToSave,
              [key]: {
                ...schemaToSave[key],
                isArray: this.validateIsArray(key, schema.isArray),
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
    type: CustomSchema | SchemaField,
  ): CustomSchema | SchemaField {
    if (type instanceof CustomSchema || type instanceof SchemaField) {
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

  private validatePosibleNull(key: string, pos: boolean | number): number {
    let value: number;

    if (typeof pos === "number") {
      value = pos <= 100 && pos >= 0 ? pos : 50;
    } else {
      value = Boolean(pos) ? 50 : 0;
    }

    return value;
  }

  private validateIsArray(
    key: string,
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
}
