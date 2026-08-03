import { Schema } from "../schema";
import { DatasetStore } from "../../dataset-store/dataset-store";
import {
  EnumField,
  KeyField,
  PickField,
  ProbabilityField,
  RefField,
  SequenceField,
  SequentialField,
} from "../../fields/core";
import { CustomField } from "../../fields/core/custom/custom-field";
import { IResolver } from "../../resolvers/interfaces/resolvers";
import { FieldIsArray } from "../../schema-resolver/value-object/array";
import { FieldPossibleNull } from "../../schema-resolver/value-object/possible-null";

export type FieldTypes<R = any> =
  | CustomField<any, R>
  | KeyField
  | EnumField
  | PickField
  | ProbabilityField
  | RefField
  | SequenceField
  | SequentialField
  | Schema;

export type FieldObjectInput<R = any> = {
  /** Schema field type*/
  type: FieldTypes<R>;
  /** Array schema field configuration
   * - `number` - specific array length
   * - `config.min` and `config.max` - limits of array length
   * - `function` - function that returns a number or a `{ min, max }` object. Receive 'currentFields' and 'store' as parameters
   */
  isArray?: IsArrayConfig;
  /** Null schema field configuration
   * - `boolean` - `true` 100% chances to be null, `false` 0% chances
   * - `float` between 0 and 1 - probability for each document of being null
   * - `integer` greater than or equal to 1 - exact number of documents with a null value
   * - `function` function that returns a number between 0 and 1 or a boolean. Receive 'currentFields' and 'store' as parameters
   */
  possibleNull?: PossibleNullConfig;
};

export type SchemaFieldConfig<R = any> = FieldTypes<R> | FieldObjectInput<R>;

/**
 * Input schema config
 */
export type SchemaInput = Record<string, SchemaFieldConfig>;

export type ResolverObject = {
  type: IResolver;
  isArray: FieldIsArray;
  possibleNull: FieldPossibleNull;
};

export type ArrayLimitObject = { min?: number; max?: number };

export type IsArrayFunction = (
  props: IsArrayFunctionProps,
) =>
  | ArrayLimitObject
  | number
  | undefined
  | Promise<ArrayLimitObject | number | undefined>;
export type IsArrayFunctionProps<C = any> = {
  /** Current schema document fields */
  currentFields: C;
  /** Store to interact with all dataset schemas */
  store: DatasetStore;
};

export type PossibleNullFunction = (
  props: PossibleNullFunctionProps,
) => number | boolean | undefined | Promise<number | boolean | undefined>;
export type PossibleNullFunctionProps<C = any> = {
  /** Current schema document fields */
  currentFields: C;
  /** Store to interact with all dataset schemas */
  store: DatasetStore;
};

export type IsArrayConfig =
  number | ArrayLimitObject | IsArrayFunction | undefined;

export type PossibleNullConfig =
  boolean | number | PossibleNullFunction | undefined;
