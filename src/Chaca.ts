import { ChacaSchema } from "./core/schema";
import { EnumField } from "./core/fields/core/enum/EnumField";
import { KeyField, KeyFieldProps } from "./core/fields/core/key/KeyField";
import {
  FieldRefInputConfig,
  FieldToRef,
  RefField,
} from "./core/fields/core/ref";
import {
  SequenceField,
  SequenceFieldProps,
} from "./core/fields/core/sequence/SequenceField";
import {
  SequentialField,
  SequentialFieldConfig,
} from "./core/fields/core/sequential/SequentialField";
import { ChacaUtils } from "./core/utils";
import { SchemaInput } from "./core/schema/interfaces/schema";
import { DatasetSchema } from "./core/dataset-resolver/interfaces/resolver";
import { ExportResolver } from "./core/export/ExportResolver";
import { FileConfig } from "./core/export/interfaces/export";
import {
  ProbabilityOption,
  ProbabilityField,
} from "./core/fields/core/probability";
import { PickField, PickFieldProps } from "./core/fields/core/pick/PickField";
import { Dataset } from "./core/dataset";
import { Module } from "./modules";
import { ModuleFunction } from "./modules/module";

export class Chaca {
  utils = new ChacaUtils();

  /**
   * @param input The object with the keys and type of each field
   * @example
   * {
   *    id: schemas.id.uuid(),
   *    image: schemas.image.film(),
   *    name: schemas.person.firstName()
   * }
   */
  schema<K = any>(input: SchemaInput): ChacaSchema<K> {
    const newSchema = new ChacaSchema<K>(input);
    return newSchema;
  }

  /**
   * Define your ouwn type schema for create your data
   * @param func function that returns a value
   */
  module<V = any, A = never>(func: ModuleFunction<V, A>) {
    return (...args: A[]) => new Module<V, A>(func, ...args);
  }

  /**
   * Create a reference field for a selected schema
   * @param field configuration of the reference field. the field location must be separated points
   *
   * @example
   * {
   *    field: chaca.ref('Schema.fieldToRef')
   * }
   */
  ref(field: FieldToRef, config?: FieldRefInputConfig) {
    return new RefField(field, config);
  }

  /**
   * Sequential field
   * @param values array of the secuential values
   * @param config.loop Boolean indicating whether the values should be generated cyclically. Default `false`
   * @example
   * // the first generated object will have the favoriteNumber with value 1
   * // the second generated object will have the favoriteNumber with value 2
   * // the third generated object will have the favoriteNumber with value 3
   * {
   *   favoriteNumber: chaca.sequential([1, 2, 3])
   * }
   */
  sequential<K = any>(values: K[], config?: SequentialFieldConfig) {
    return new SequentialField(values, config);
  }

  /**
   * Sequence field
   * @param config.starsWith Init value for the field. Default `1`
   * @param config.step Step between field values in schema documents. Default `1`
   */
  sequence(config?: SequenceFieldProps) {
    return new SequenceField(config);
  }

  /**
   * Key field
   * @param field field that will return the value. Could be (`Module` | `RefField` | `SequenceField` | `CustomField` )
   *
   * @example
   * chaca.key(chaca.sequence())
   * chaca.key(schemas.id.uuid())
   */
  key<A = any, C = any>(field: KeyFieldProps<A, C>) {
    return new KeyField<A>(field);
  }

  /**
   * Enum field
   * @param values Array of posible values
   */
  enum<R = any>(values: R[]) {
    return new EnumField<R>(values);
  }

  /**
   * Export the data to a selected code format
   * @param data Data you want to export
   * @param config Configuration of the file you want to export (name, location, format, etc.)
   * @param config.filename file name
   * @param config.location location of the file
   * @param config.format file extension (`'java'` | `'csv'` | `'typescript'` | `'json'` | `'javascript'` | `'yaml'` | `'postgresql'` | `'python'`)
   *
   * @example
   * const data = [{id: '1664755445878', name: 'Alberto', age: 20}, {id: '1664755445812', name: 'Carolina', age: 28}]
   * const config = { filename: 'users', format: 'json', location: '../../data' }
   * await schema.export(data, config)
   *
   * @returns
   * Promise<string>
   */
  async export(data: any, config: FileConfig) {
    const resolver = new ExportResolver(config);
    const route = await resolver.data(data);

    return route;
  }

  /**
   * Generate data from realtional schemas
   * @param schemas Array with the schemas config
   */
  dataset<K = any>(schemas: DatasetSchema[]): Dataset<K> {
    const dataset = new Dataset<K>(schemas);
    return dataset;
  }

  /**
   * Probability field
   * @param options Array of options to choose from. Where each one has the 'chance' parameter to indicate the probability of being chosen.
   *
   * @example
   * chaca.probability([
   *   { chance: 0.9, value: 10 },
   *   { chance: 0.5, value: 5 },
   *   { chance: 0.1, value: 1 },
   * ])
   */
  probability<T = any>(options: ProbabilityOption<T>[]) {
    return new ProbabilityField<T>(options);
  }

  /**
   * Select a number of elements in an array so that all selected values are not repeated
   *
   * @param props.values array of values
   * @param props.count number of items to select
   *
   * @example
   * chaca.pick({
   *    values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
   *    count: 3
   * })
   * // [2, 6, 10] or [4, 5, 1] or [1, 9, 8] or ...
   */
  pick<V = any>(props: PickFieldProps<V>) {
    return new PickField(props);
  }
}
