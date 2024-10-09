import { Schema } from "..";
import { DatasetStore } from "../../dataset-store";
import {
  EnumField,
  KeyField,
  PickField,
  ProbabilityField,
  RefField,
  SequenceField,
  SequentialField,
} from "../../fields/core";
import { CustomField } from "../../fields/core/custom";
import { IResolver } from "../../resolvers/interfaces/resolvers";
import { FieldIsArray } from "../value-object";

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
   * - `boolean`- array length between 1 and 10
   * - `number` - specific array length
   * - `config.min` and `config.max` - limits of array length
   */
  isArray?: IsArrayConfig;
  /** Null schema field configuration
   * - `boolean` - `true` 50% chances to be null, `false` 0% chances
   * - `number` specific porcent of chances
   * - `function` function that returns a number between 0 and 100 or a boolean. Receive 'currentFields' and 'store' as parameters
   */
  possibleNull?: PossibleNullConfig;
};

export type SchemaFieldConfig<R = any> = FieldTypes<R> | FieldObjectInput<R>;

/**
 * Input schema config
 */
export type SchemaInput = Record<string, SchemaFieldConfig>;

export type SchemaToResolve = Record<string, ResolverObject>;

export type ResolverObject = {
  type: IResolver;
  isArray: FieldIsArray;
  possibleNull: FieldPossibleNullConfig;
};

export type ArrayLimitObject = { min?: number; max?: number };
export type FieldIsArrayConfig =
  | ArrayLimitObject
  | null
  | number
  | IsArrayFunction;
export type IsArrayFunction = (
  props: IsArrayFunctionProps,
) => ArrayLimitObject | number;
export type IsArrayFunctionProps<C = any> = {
  /** Current schema document fields */
  currentFields: C;
  /** Store to interact with all datasets */
  store: DatasetStore;
};

export type FieldPossibleNullConfig = number | PossibleNullFunction;
export type PossibleNullFunction = (
  props: PossibleNullFunctionProps,
) => number | boolean;
export type PossibleNullFunctionProps<C = any> = {
  /** Current schema document fields */
  currentFields: C;
  /** Store to interact with all datasets */
  store: DatasetStore;
};

export type IsArrayConfig = number | ArrayLimitObject | IsArrayFunction;
export type PossibleNullConfig = boolean | number | PossibleNullFunction;
