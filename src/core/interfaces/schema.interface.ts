import { SchemaField } from "../../schemas/SchemaField.js";
import { ChacaSchema } from "../classes/ChacaSchema/ChacaSchema.js";
import { SequentialField } from "../classes/SequentialField/SequentialField.js";
import { KeyField } from "../classes/KeyField/KeyField.js";
import { RefField } from "../classes/RefField/RefField.js";
import { SequenceField } from "../classes/SequenceField/SequenceField.js";
import { DatasetStore } from "../classes/DatasetStore/DatasetStore.js";
import { EnumField } from "../classes/EnumField/EnumField.js";

/**
 * Posible fields configurations in a schema
 */
export type SchemaInputField =
  | FieldSchemaConfig
  | SequentialField
  | KeyField
  | SequenceField;

export type FieldSchemaConfig<R = any> =
  | FieldObjectInput<R>
  | CustomField<any, R>
  | SchemaField<R, any>
  | ChacaSchema<R>
  | RefField
  | EnumField<R>;

/**
 * Input schema config
 */
export type SchemaInput = Record<string, SchemaInputField>;

export type SchemaToResolve = Record<string, ResolverObject>;

export type ResolverObject = {
  type: IResolver;
  isArray: { min: number; max: number } | null;
  posibleNull: number;
};

export type FieldTypeInput<R = any> =
  | SchemaField<R, any>
  | ChacaSchema<R>
  | RefField
  | CustomField<any, R>
  | EnumField<R>;

export type FieldObjectInput<R> = {
  /** Schema field type*/
  type?: FieldTypeInput<R>;
  /** Array schema field configuration
   * - `boolean`- array length between 1 and 10
   * - `number` - specific array length
   * - `config.min` and `config.max` - limits of array length
   */
  isArray?: boolean | number | { min?: number; max?: number };
  /** Null schema field configuration
   * - `boolean` - `true` 50% chances to be null, `false` 0% chances
   * - `number` specific porcent of chances
   */
  posibleNull?: boolean | number;
};

/**
 * Function that returns a value depending on the state of the current document and the dataset
 */
export type CustomField<C = any, R = any> = (args: {
  /** Current schema document fields */
  currentFields: C;
  /** Store to interact with all datasets */
  store: DatasetStore;
}) => R;

export interface CommonSchema {
  isArray: FieldIsArrayConfig;
  posibleNull: number;
}

export type FieldIsArrayConfig = { min: number; max: number } | null;

export class IResolver {}
