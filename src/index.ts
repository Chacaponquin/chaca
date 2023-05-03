import { ChacaUtils } from "./core/helpers/ChacaUtils.js";
import { SchemaInput } from "./core/interfaces/schema.interface.js";
import {
  ExportFormat,
  FileConfig,
} from "./core/interfaces/export.interface.js";

import { Schemas } from "./schemas/index.js";
import { SchemaField } from "./schemas/SchemaField.js";

import { ChacaSchema } from "./core/classes/ChacaSchema/ChacaSchema.js";

import { Export } from "./core/helpers/Export.js";
import {
  ChacaError,
  EmptySequentialValuesError,
  TryRefANoKeyFieldError,
  NotEnoughValuesForRefError,
} from "./errors/ChacaError.js";

import {
  MultiGenerate,
  MultiGenerateSchema,
} from "./core/helpers/MultiGenerate/MultiGenerate.js";

import {
  FieldRefInputConfig,
  FieldToRef,
  FieldToRefObject,
  RefFieldWhere,
  RefFieldResolver,
} from "./core/classes/Resolvers/RefFieldResolver/RefFieldResolver.js";

import { SequentialField } from "./core/classes/SequentialField/SequentialField.js";
import { KeyField } from "./core/classes/KeyField/KeyField.js";

import { ToSQL, ToSQLConfig } from "./core/helpers/ToSQL/ToSQL.js";

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
  defineSchema<K = any, T = any>(inputObj: SchemaInput<T>): ChacaSchema<K, T> {
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

  /**
   * Create a reference field for a selected schema
   * @param fieldToRef configuration of the reference field. the field location must be separated points
   *
   * @example
   * {field: chaca.ref('Schema.fieldToRef')}
   */
  ref(fieldToRef: FieldToRef, config?: FieldRefInputConfig) {
    return new RefFieldResolver(fieldToRef, config);
  },

  /**
   *
   * @param valuesArray array of the secuential values
   * @example
   * // the first generated object will have the favoriteNumber with value 1
   * // the second generated object will have the favoriteNumber with value 2
   * // the third generated object will have the favoriteNumber with value 3
   * {
   *   favoriteNumber: chaca.sequential([1, 2, 3])
   * }
   */
  sequential<K = any>(valuesArray: Array<K>) {
    return new SequentialField(valuesArray);
  },

  key<A = any>(schemaField: SchemaField<string | number, A>) {
    return new KeyField<A>(schemaField);
  },

  toSQL: ToSQL,

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

export {
  SchemaField,
  ChacaSchema,
  ChacaError,
  TryRefANoKeyFieldError,
  EmptySequentialValuesError,
  KeyField,
  NotEnoughValuesForRefError,
};

export type {
  SchemaInput,
  ExportFormat,
  FileConfig,
  MultiGenerateSchema,
  FieldToRef,
  FieldToRefObject,
  ToSQLConfig,
  RefFieldWhere,
};
