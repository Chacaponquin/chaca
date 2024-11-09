import { Schema } from "./core/schema";
import { EnumField } from "./core/fields/core/enum";
import { KeyField, KeyFieldProps } from "./core/fields/core/key";
import { RefFieldConfig, FieldToRef, RefField } from "./core/fields/core/ref";
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
import { ExportResolver } from "./core/export/resolvers/export/export";
import { DumpConfig, FileConfig } from "./core/export/interfaces/export";
import {
  ProbabilityOption,
  ProbabilityField,
} from "./core/fields/core/probability";
import { PickField, PickFieldProps } from "./core/fields/core/pick";
import { Dataset } from "./core/dataset";
import { DatatypeModule } from "./modules/datatype";
import { GeneratorFilter } from "./core/export/resolvers/generator-filter/generator-filter";
import { DumpFile } from "./core/export/generators/generator";
import { DumpResolver } from "./core/export/resolvers/dump/dump";

export class Chaca {
  constructor(
    private readonly datatypeModule: DatatypeModule,
    readonly utils: ChacaUtils,
  ) {}

  /**
   * @param input The object with the keys and type of each field
   *
   * @example
   * chaca.schema({
   *    id: chaca.key(() => modules.id.uuid()),
   *    image: () => modules.image.film(),
   *    name: () => modules.person.firstName()
   * })
   */
  schema<K = any>(input: SchemaInput): Schema<K> {
    const newSchema = new Schema<K>(input, this.utils, this.datatypeModule);
    return newSchema;
  }

  /**
   * Create a reference field for a selected schema
   * @param field Configuration of the reference field. the field location must be separated points
   * @param config.unique The value to be referenced will only be taken once by this schema. Default `false`
   * @param config.where Function that filters the fields to reference
   * @param config.nullOnEmpty When there are no more documents to reference, the generated value will be null. Default `false`
   *
   * @example
   * chaca.ref('schema.field')
   */
  ref(field: FieldToRef, config?: RefFieldConfig): RefField {
    return new RefField(field, config);
  }

  /**
   * Sequential field
   *
   * @param values Array of the secuential values
   * @param config.loop Boolean indicating whether the values should be generated cyclically. Default `false`
   * @example
   * chaca.schema({
   *   number: chaca.sequential([1, 2, 3])
   * })
   *
   * // array result
   * [
   *    { number: 1 },
   *    { number: 2 },
   *    { number: 3 }
   * ]
   */
  sequential<K = any>(values: K[], config?: SequentialFieldConfig) {
    return new SequentialField(values, config);
  }

  /**
   * Sequence field
   * @param config.starsWith Init value for the field. Default `1`
   * @param config.step Step between field values in schema documents. Default `1`
   *
   * @example
   * chaca.sequence()
   * chaca.sequence({ startsWith: 10 })
   * chaca.sequence({ step: 0.5 })
   */
  sequence(config?: SequenceFieldProps) {
    return new SequenceField(config);
  }

  /**
   * Key field
   * @param field field that will return the value. Could be (`RefField` | `SequenceField` | `CustomField` )
   *
   * @example
   * chaca.key(chaca.sequence())
   * chaca.key(() => modules.id.uuid())
   */
  key(field: KeyFieldProps) {
    return new KeyField(field);
  }

  /**
   * Enum field
   * @param values Array of posible values
   *
   * @example
   * chaca.enum(["category1", "category2", "category3"])
   */
  enum<R = any>(values: ReadonlyArray<R>) {
    return new EnumField<R>(values);
  }

  /**
   * Export the data to a selected code format
   * @param data Data you want to export
   * @param config.filename file name
   * @param config.location location of the file
   * @param config.format file extension (`'java'` | `'csv'` | `'typescript'` | `'json'` | `'javascript'` | `'yaml'` | `'postgresql'` | `'python'`)
   *
   * @example
   * const data = [
   *  { id: 1, name: 'Alberto', age: 20 },
   *  { id: 2, name: 'Carolina', age: 28 }
   * ]
   * const config = { filename: 'users', format: 'json', location: '../../data' }
   *
   * await chaca.export(data, config)
   *
   * @returns
   * Promise<string[]>
   */
  async export(data: any, config: FileConfig): Promise<string[]> {
    const filter = new GeneratorFilter(this.utils);
    const resolver = new ExportResolver(
      this.utils,
      this.datatypeModule,
      filter,
      config,
    );

    const route = await resolver.data(data);

    return route;
  }

  /**
   * Generate data from realtional schemas
   * @param schemas Array with the schemas config
   */
  dataset<K = any>(schemas: DatasetSchema[]): Dataset<K> {
    const dataset = new Dataset<K>(schemas, this.utils, this.datatypeModule);
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
  probability<T = any>(options: ProbabilityOption<T>[]): ProbabilityField<T> {
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
   *
   * // [2, 6, 10] or [4, 5, 1] or [1, 9, 8] or ...
   */
  pick<V = any>(props: PickFieldProps<V>) {
    return new PickField<V>(props);
  }

  /**
   * Serializes `data` as a specific file format
   *
   * @param data Data to transform
   * @param props.filename name for the file
   * @param props.format file extension (`'java'` | `'csv'` | `'typescript'` | `'json'` | `'javascript'` | `'yaml'` | `'postgresql'` | `'python'`)
   */
  transform(data: any, props: DumpConfig): DumpFile[] {
    const filter = new GeneratorFilter(this.utils);
    const resolver = new DumpResolver(
      this.utils,
      this.datatypeModule,
      filter,
      props,
    );

    return resolver.data(data);
  }
}
