import { ChacaSchema } from "./core/classes/ChacaSchema/ChacaSchema.js";
import { EnumField } from "./core/classes/EnumField/EnumField.js";
import { KeyField, KeyFieldProps } from "./core/classes/KeyField/KeyField.js";
import {
  FieldRefInputConfig,
  FieldToRef,
  RefField,
} from "./core/classes/RefField/RefField.js";
import {
  SequenceField,
  SequenceFieldProps,
} from "./core/classes/SequenceField/SequenceField.js";
import { SequentialField } from "./core/classes/SequentialField/SequentialField.js";
import { ChacaUtils } from "./core/helpers/ChacaUtils.js";
import { SchemaInput } from "./core/interfaces/schema.interface.js";
import { SchemaField } from "./schemas/SchemaField.js";
import { Export, ExportFromSchemas } from "./core/helpers/Export/index.js";
import { MultiGenerate } from "./core/helpers/MultiGenerate/MultiGenerate.js";

export class Chaca {
  utils = new ChacaUtils();

  /**
   * @param inputObj The object with the keys and type of each field
   * @example
   * { id: schemas.id.numberRow(), image: schemas.image.film(), name: schemas.person.firstName()}
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
  schemaField<T = any, K = unknown>(
    name: string,
    valueFunction: (args: T) => K,
  ): (args?: T) => SchemaField<K, T> {
    return (args) =>
      new SchemaField<K, T>(name, valueFunction, args || (undefined as T));
  }

  /**
   * Create a reference field for a selected schema
   * @param fieldToRef configuration of the reference field. the field location must be separated points
   *
   * @example
   * {field: chaca.ref('Schema.fieldToRef')}
   */
  ref(fieldToRef: FieldToRef, config?: FieldRefInputConfig) {
    return new RefField(fieldToRef, config);
  }

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
  }

  sequence(config?: Partial<SequenceFieldProps>) {
    return new SequenceField(config);
  }

  key<A = any, C = any>(schemaField: KeyFieldProps<A, C>) {
    return new KeyField<A>(schemaField);
  }

  enum<R = any>(array: Array<R>) {
    return new EnumField<R>(array);
  }

  exportFromSchemas = ExportFromSchemas;

  /**
   * Export the data to a selected code format
   * @param data Data you want to export
   * @param config Configuration of the file you want to export (name, location, format, etc.)
   * @param config.location location of the file
   * @param config.format file extension (`'java'` | `'csv'` | `'typescript'` | `'json'` | `'javascript'` | `'yaml'` | `'postgresql'`)
   *
   * @example
   * const data = [{id: '1664755445878', name: 'Alberto', age: 20}, {id: '1664755445812', name: 'Carolina', age: 28}]
   * const config = {fileName: 'users', format: 'json', location: '../../data'}
   * await schema.export(data, config)
   *
   * @returns
   * Promise<string>
   */
  export = Export;

  multiGenerate = MultiGenerate;
}
