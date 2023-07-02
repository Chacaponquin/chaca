import { SchemaField } from "../../schemas/SchemaField.js";
import { ChacaSchema } from "../classes/ChacaSchema/ChacaSchema.js";
import { SequentialField } from "../classes/SequentialField/SequentialField.js";
import { KeyField } from "../classes/KeyField/KeyField.js";
import { RefField } from "../classes/RefField/RefField.js";
import { SequenceField } from "../classes/SequenceField/SequenceField.js";
import { DatasetStore } from "../classes/DatasetStore/DatasetStore.js";
import { EnumField } from "../classes/EnumField/EnumField.js";

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
  type?: FieldTypeInput<R>;
  isArray?: boolean | number | { min?: number; max?: number };
  posibleNull?: boolean | number;
};

export type CustomField<C, R> = (args: {
  currentFields: C;
  store: DatasetStore;
}) => R;

export interface CommonSchema {
  isArray: FieldIsArrayConfig;
  posibleNull: number;
}

export type FieldIsArrayConfig = { min: number; max: number } | null;

export class IResolver {}
