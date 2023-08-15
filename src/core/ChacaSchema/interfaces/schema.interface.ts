import { SchemaField } from "../../../schemas/SchemaField.js";
import { ChacaSchema } from "../ChacaSchema.js";
import { DatasetStore } from "../../DatasetStore/DatasetStore.js";
import {
  EnumField,
  KeyField,
  RefField,
  SequenceField,
  SequentialField,
} from "../../Fields/core/index.js";
import { IResolver } from "../../Resolvers/interfaces/resolvers.interface.js";

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
  isArray: FieldIsArrayConfig;
  possibleNull: number;
};

export type FieldTypeInput<R = any> =
  | SchemaField<R, any>
  | ChacaSchema<R>
  | RefField
  | CustomField<any, R>
  | EnumField<R>;

export type ArrayLimitObject = { min: number; max: number };
export type FieldIsArrayConfig = ArrayLimitObject | null;

export type InputIsArrayConfig = boolean | number | Partial<ArrayLimitObject>;
export type InputPossibleNull = boolean | number;

export type FieldObjectInput<R> = {
  /** Schema field type*/
  type?: FieldTypeInput<R>;
  /** Array schema field configuration
   * - `boolean`- array length between 1 and 10
   * - `number` - specific array length
   * - `config.min` and `config.max` - limits of array length
   */
  isArray?: InputIsArrayConfig;
  /** Null schema field configuration
   * - `boolean` - `true` 50% chances to be null, `false` 0% chances
   * - `number` specific porcent of chances
   */
  posibleNull?: InputPossibleNull;
};

/**
 * Function that returns a value depending on the state of the current document and the dataset
 */
export type CustomField<C = any, R = any> = (args: CustomFieldProps<C>) => R;
export type CustomFieldProps<C = any> = {
  /** Current schema document fields */
  currentFields: C;
  /** Store to interact with all datasets */
  store: DatasetStore;
};
