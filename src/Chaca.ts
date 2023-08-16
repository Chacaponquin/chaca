import { ChacaSchema } from "./core/ChacaSchema/ChacaSchema.js";
import { EnumField } from "./core/Fields/core/EnumField/EnumField.js";
import {
  KeyField,
  KeyFieldProps,
} from "./core/Fields/core/KeyField/KeyField.js";
import {
  FieldRefInputConfig,
  FieldToRef,
  RefField,
} from "./core/Fields/core/RefField/RefField.js";
import {
  SequenceField,
  SequenceFieldProps,
} from "./core/Fields/core/SequenceField/SequenceField.js";
import {
  SequentialField,
  SequentialFieldConfig,
} from "./core/Fields/core/SequentialField/SequentialField.js";
import { ChacaUtils } from "./core/ChacaUtils/ChacaUtils.js";
import { SchemaInput } from "./core/ChacaSchema/interfaces/schema.interface.js";
import { SchemaField } from "./schemas/SchemaField.js";
import {
  GenerateConfig,
  MultiGenerateSchema,
} from "./core/MultiGenerate/interfaces/multiGenerate.interface.js";
import { ExportResolver } from "./core/Export/ExportResolver.js";
import { FileConfig } from "./core/Export/interfaces/export.interface.js";
import { MultiGenerateResolver } from "./core/MultiGenerate/MultiGenerateResolver.js";

export class Chaca {
  utils = new ChacaUtils();

  /**
   * @param inputObj The object with the keys and type of each field
   * @example
   * { id: schemas.id.numberRow(), image: schemas.image.film(), name: schemas.person.firstName() }
   */
  schema<K = any>(inputObj: SchemaInput): ChacaSchema<K> {
    const newSchema = new ChacaSchema<K>(inputObj);
    return newSchema;
  }

  /**
   * Define your ouwn type schema for create your data
   * @param name schema field name
   * @param valueFunction function that returns a value
   */
  schemaField<T = any, K = any>(
    name: string,
    valueFunction: (args: T) => K,
  ): (args?: T) => SchemaField<K, T> {
    return (args) =>
      new SchemaField<K, T>(name, valueFunction, args || ({} as T));
  }

  /**
   * Create a reference field for a selected schema
   * @param fieldToRef configuration of the reference field. the field location must be separated points
   *
   * @example
   * {
   *    field: chaca.ref('Schema.fieldToRef')
   * }
   */
  ref(fieldToRef: FieldToRef, config?: FieldRefInputConfig) {
    return new RefField(fieldToRef, config);
  }

  /**
   * Sequential field
   * @param valuesArray array of the secuential values
   * @example
   * // the first generated object will have the favoriteNumber with value 1
   * // the second generated object will have the favoriteNumber with value 2
   * // the third generated object will have the favoriteNumber with value 3
   * {
   *   favoriteNumber: chaca.sequential([1, 2, 3])
   * }
   */
  sequential<K = any>(valuesArray: Array<K>, config?: SequentialFieldConfig) {
    return new SequentialField(valuesArray, config);
  }

  /**
   * Sequence field
   * @param config.starsWith Init value for the field. Default `1`
   * @param config.step Step between field values in schema documents. Default `1`
   */
  sequence(config?: Partial<SequenceFieldProps>) {
    return new SequenceField(config);
  }

  /**
   * Key field
   * @param fieldType field that will return the value. Could be (`SchemaField` | `RefField` | `SequenceField` | `CustomField` )
   *
   * @example
   * chaca.key(chaca.sequence())
   * chaca.key(schemas.id.uuid())
   */
  key<A = any, C = any>(fieldType: KeyFieldProps<A, C>) {
    return new KeyField<A>(fieldType);
  }

  /**
   * Enum field
   * @param array Array of posible values
   */
  enum<R = any>(array: Array<R>) {
    return new EnumField<R>(array);
  }

  /**
   * Generate and export data from relational schemas
   * @param schemas Array with the schemas config
   * @param fileConfig.fileName file name
   * @param fileConfig.location location of the file
   * @param fileConfig.format file extension (`'java'` | `'csv'` | `'typescript'` | `'json'` | `'javascript'` | `'yaml'` | `'postgresql'` | `'python'`)
   * @param genConfig.verbose Show log in console progretion
   */
  async exportFromSchemas(
    schemas: Array<MultiGenerateSchema>,
    fileConfig: FileConfig,
    genConfig?: GenerateConfig,
  ) {
    const exportResolver = new ExportResolver(fileConfig);
    return await exportResolver.exportRelationalSchemas(schemas, genConfig);
  }

  /**
   * Export the data to a selected code format
   * @param data Data you want to export
   * @param config Configuration of the file you want to export (name, location, format, etc.)
   * @param config.fileName file name
   * @param config.location location of the file
   * @param config.format file extension (`'java'` | `'csv'` | `'typescript'` | `'json'` | `'javascript'` | `'yaml'` | `'postgresql'` | `'python'`)
   *
   * @example
   * const data = [{id: '1664755445878', name: 'Alberto', age: 20}, {id: '1664755445812', name: 'Carolina', age: 28}]
   * const config = { fileName: 'users', format: 'json', location: '../../data' }
   * await schema.export(data, config)
   *
   * @returns
   * Promise<string>
   */
  async export(data: any, config: FileConfig) {
    const exportResolver = new ExportResolver(config);
    return await exportResolver.exportData(data);
  }

  /**
   * Generate data from realtional schemas
   * @param schemas Array with the schemas config
   * @param config.verbose Show log in console progretion
   */
  multiGenerate<K = any>(
    schemas: Array<MultiGenerateSchema>,
    config?: GenerateConfig,
  ) {
    const resolver = new MultiGenerateResolver<K>(schemas, config);
    return resolver.resolve();
  }
}
