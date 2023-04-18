import { ChacaUtils } from "./utils/helpers/ChacaUtils.js";
import { SchemaInput } from "./utils/interfaces/schema.interface.js";
import {
  ExportFormat,
  FileConfig,
} from "./utils/interfaces/export.interface.js";

import { Schemas } from "./schemas/index.js";
import { SchemaField } from "./schemas/SchemaField.js";

import { ChacaSchema } from "./utils/classes/ChacaSchema/ChacaSchema.js";

import { Export } from "./utils/helpers/Export.js";
import { ChacaError } from "./errors/ChacaError.js";

import {
  MultiGenerate,
  MultiGenerateSchema,
} from "./utils/helpers/MultiGenerate.js";

import {
  FieldToRef,
  FieldToRefObject,
  RefFieldResolver,
} from "./utils/classes/Resolvers/RefFieldResolver/RefFieldResolver.js";

const Chaca = {
  Schema: ChacaSchema,
  utils: ChacaUtils,

  /**
   *
   * @param schemaName schema name
   * @throws The name of schema can't be an empty string, or a repetive name
   *
   * @param inputObj The object with the keys and type of each field
   * @example
   * { id: schemas.id.numberRow(), image: schemas.image.film(), name: schemas.person.firstName()}
   */
  defineSchema<K = any, T = any>(
    inputObj: SchemaInput<K, T>,
  ): ChacaSchema<K, T> {
    const newSchema = new ChacaSchema<K, T>(inputObj);
    return newSchema;
  },

  /**
   * Define your ouwn type schema for create your data
   * @param name Name
   * @param valueFunction
   */
  defineSchemaField<T = any, K = unknown>(
    name: string,
    valueFunction: (args: T) => K,
  ): (args?: T) => SchemaField<K, T> {
    return (args) =>
      new SchemaField<K, T>(name, valueFunction, args || ({} as T));
  },

  ref(fieldToRef: FieldToRef) {
    return new RefFieldResolver(fieldToRef);
  },

  /**
   * Export the data to a selected code format
   * @param data Data you want to export
   * @param config Configuration of the file you want to export (name, location, format, etc.)
   * @param config.location location of the file
   * @param config.format file extension (`'java'` | `'csv'` | `'typescript'` | `'json'` | `'javascript'` | `'yaml'`)
   *
   *  - `'java'`
   * Export a zip file with the classes files and the main java file with the initialization of data
   *
   * - `'csv'`
   * Export a csv file with the data created
   *
   * - `'typescript'`
   * Export a ts file with the data created
   *
   * - `'javascript'`
   * Export a js file with the data created
   *
   * - `'json'`
   * Export a json file with the data created
   *
   * - `'yaml'`
   * Export a yaml file with the data created
   *
   * @example
   * const data = [{id: '1664755445878', name: 'Alberto', age: 20}, {id: '1664755445812', name: 'Carolina', age: 28}]
   * const config = {fileName: 'Users', format: 'json', location: '../../data'}
   * await schema.export(data, config)
   *
   * @returns
   * Promise<string>
   */
  export: Export,

  multiGenerate: MultiGenerate,
};

export const chaca = Chaca;
export const schemas = Schemas;

export { SchemaField, ChacaSchema, ChacaError };

export type {
  SchemaInput,
  ExportFormat,
  FileConfig,
  MultiGenerateSchema,
  FieldToRef,
  FieldToRefObject,
};
