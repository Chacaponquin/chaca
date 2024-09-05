import { ChacaSchema } from "..";
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
import { IResolver } from "../../resolvers/interfaces/resolvers";

export type FieldTypes<R = any> =
  | CustomField<any, R>
  | KeyField
  | EnumField
  | PickField
  | ProbabilityField
  | RefField
  | SequenceField
  | SequentialField
  | ChacaSchema;

export type FieldObjectInput<R = any> = {
  /** Schema field type*/
  type: FieldTypes<R>;
  /** Array schema field configuration
   * - `boolean`- array length between 1 and 10
   * - `number` - specific array length
   * - `config.min` and `config.max` - limits of array length
   */
  isArray?: InputIsArrayConfig;
  /** Null schema field configuration
   * - `boolean` - `true` 50% chances to be null, `false` 0% chances
   * - `number` specific porcent of chances
   * - `function` function that returns a number between 0 and 100 or a boolean. Receive 'currentFields' and 'store' as parameters
   */
  possibleNull?: InputPossibleNull;
};

export type SchemaFieldConfig<R = any> = FieldTypes<R> | FieldObjectInput<R>;

/**
 * Input schema config
 */
export type SchemaInput = Record<string, SchemaFieldConfig>;

export type SchemaToResolve = Record<string, ResolverObject>;

export type ResolverObject = {
  type: IResolver;
  isArray: FieldIsArrayConfig;
  possibleNull: FieldPossibleNullConfig;
};

export type ArrayLimitObject = { min: number; max: number };
export type FieldIsArrayConfig = ArrayLimitObject | null;
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

export type InputIsArrayConfig = boolean | number | Partial<ArrayLimitObject>;
export type InputPossibleNull = boolean | number | PossibleNullFunction;

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
