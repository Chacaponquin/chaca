import { CHDataError } from "../errors/CHDataError";
import { CHDataUtils } from "./CHDataUtils";
import {
  SchemaObject,
  SchemaConfig,
  SchemaDefaultConfig,
} from "./interfaces/schema.interface";
import { ReturnValue } from "./interfaces/value.interface";
import { FileConfig, ReturnDoc } from "./interfaces/export.interface";
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
export class CustomSchema {
  //SCHEMA NAME
  private schemaObj: SchemaObject<SchemaDefaultConfig>;
  private currentObjectCreated: { [path: string]: any } | null = null;

  constructor(
    public readonly schemaName: string,
    schemaObj: SchemaObject<SchemaConfig>,
  ) {
    if (!schemaName) throw new CHDataError("Your schema must have a name");
    else {
      this.schemaObj = this.validateObjectSchema(schemaObj);
    }
  }

  public generate(cantDocuments: number): ReturnDoc[] {
    const cantDoc =
      typeof cantDocuments === "number" && cantDocuments > 0
        ? cantDocuments
        : 10;

    let returnArray: ReturnDoc[] = [];

    for (let i = 1; i <= cantDoc; i++) {
      let doc: { [key: string]: ReturnValue | ReturnValue[] } = {};
      for (const [key, schema] of Object.entries(this.schemaObj)) {
        let retValue: ReturnValue | ReturnValue[];

        if (schema.isArray) {
          retValue = [] as ReturnValue[];
          let limit: number = 10;
          if (typeof schema.isArray === "object") {
            limit = CHDataUtils.numberByLimits(schema.isArray);
          } else if (typeof schema.isArray === "number") {
            limit = schema.isArray;
          } else if (schema.isArray === true) {
            limit = 10;
          }

          for (let i = 1; i <= limit; i++)
            retValue.push(this.generateValueBySchema(schema));
        } else retValue = this.generateValueBySchema(schema);

        if (schema.posibleNull) {
          let porcentNull: number =
            typeof schema.posibleNull === "number" ? schema.posibleNull : 50;

          let array: (null | (ReturnValue | ReturnValue[]))[] = new Array(
            100,
          ).fill(0);

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
  public async export(data: ReturnDoc[], config: FileConfig): Promise<string> {
    if (config && typeof config.format === "string") {
      let gen: Generator;
      switch (config.format) {
        case "json": {
          gen = new JsonGenerator(data, config);
          break;
        }
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

  private generateValueBySchema(schema: SchemaDefaultConfig): ReturnValue {
    let retValue: ReturnValue;

    if (schema.type) {
      retValue = schema.type.getValue();
    } else if (schema.custom) {
      try {
        retValue =
          schema.custom.apply(
            this,
            this.currentObjectCreated ? [this.currentObjectCreated] : [{}],
          ) || null;
      } catch (error) {
        retValue = null;
      }
    } else if (schema.enum) {
      retValue = CHDataUtils.oneOfArray(schema.enum);
    } else throw new CHDataError("");

    return retValue;
  }

  private validateObjectSchema(
    obj: SchemaObject<SchemaConfig>,
  ): SchemaObject<SchemaDefaultConfig> {
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
      let schemaToSave: SchemaObject<SchemaDefaultConfig> = {};
      for (const [key, schema] of Object.entries(obj)) {
        if (schema instanceof SchemaField) {
          schemaToSave = { ...schemaToSave, [key]: { type: schema } };
        } else if (typeof schema === "function") {
          schemaToSave = { ...schemaToSave, [key]: { custom: schema } };
        } else {
          if (!schema.type && !schema.custom && !schema.enum) {
            throw new CHDataError(
              `The field ${key} dosen't have a resolve function`,
            );
          } else {
            if (schema.type) {
              schemaToSave = { ...schemaToSave, [key]: { type: schema.type } };
            } else {
              if (schema.enum) {
                if (Array.isArray(schema.enum)) {
                  if (schema.enum.length > 0) {
                    schemaToSave = {
                      ...schemaToSave,
                      [key]: { enum: schema.enum },
                    };
                  } else
                    throw new CHDataError(
                      `For the field ${key} you must provide some values to choce`,
                    );
                } else {
                  throw new CHDataError(
                    `If the field ${key} is a enum type so this one muste be an array of values`,
                  );
                }
              } else {
                if (typeof schema.custom === "function") {
                  schemaToSave = {
                    ...schemaToSave,
                    [key]: { custom: schema.custom },
                  };
                } else {
                  throw new CHDataError("The custom field must be a function");
                }
              }
            }

            if (schema.posibleNull) {
              if (typeof schema.posibleNull === "number") {
                const value =
                  schema.posibleNull <= 100 || schema.posibleNull >= 0
                    ? schema.posibleNull
                    : 50;
                schemaToSave = {
                  ...schemaToSave,
                  [key]: { ...schema, posibleNull: value },
                };
              } else {
                schemaToSave = {
                  ...schemaToSave,
                  [key]: {
                    ...schema,
                    posibleNull: Boolean(schema.posibleNull),
                  },
                };
              }
            } else
              schemaToSave = {
                ...schemaToSave,
                [key]: { ...schema, posibleNull: false },
              };

            if (schema.isArray) {
              if (typeof schema.isArray === "number") {
                schemaToSave = {
                  ...schemaToSave,
                  [key]: {
                    ...schema,
                    isArray: schema.isArray >= 1 ? schema.isArray : 10,
                  },
                };
              } else if (typeof schema.isArray === "boolean") {
                schemaToSave = {
                  ...schemaToSave,
                  [key]: {
                    ...schema,
                    isArray: schema.isArray,
                  },
                };
              } else if (
                typeof schema.isArray === "object" &&
                !(schema.isArray instanceof Date) &&
                !Array.isArray(schema.isArray)
              ) {
                let min = schema.isArray["min"] || 1;
                let max = schema.isArray["max"] || 10;

                if (min > max) {
                  let temp = max;
                  max = min;
                  min = temp;
                }

                schemaToSave = {
                  ...schemaToSave,
                  [key]: { ...schema, isArray: { min, max } },
                };
              } else {
                schemaToSave = {
                  ...schemaToSave,
                  [key]: {
                    ...schema,
                    isArray: 10,
                  },
                };
              }
            } else {
              schemaToSave = {
                ...schemaToSave,
                [key]: { ...schema, isArray: false },
              };
            }
          }
        }
      }

      return schemaToSave;
    }
  }
}
