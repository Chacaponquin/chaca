import { SchemaField } from "../../schemas/SchemaField.js";
import { ChacaSchema } from "../classes/ChacaSchema/ChacaSchema.js";
import { SequentialField } from "../classes/SequentialField/SequentialField.js";
import { KeyField } from "../classes/KeyField/KeyField.js";
import { RefField } from "../classes/RefField/RefField.js";
import { SequenceField } from "../classes/SequenceField/SequenceField.js";
import { DatasetStore } from "../classes/DatasetStore/DatasetStore.js";

export type SchemaInput<T> = {
  [key in keyof T]:
    | FieldSchemaConfig<T[key]>
    | SequentialField
    | KeyField
    | SequenceField;
};

export type SchemaToResolve<T> = {
  [key in keyof T]: ResolverObject;
};

export type ResolverObject = {
  type: IResolver;
  isArray: { min: number; max: number } | null;
  posibleNull: number;
};

export type FieldSchemaConfig<R> =
  | FieldObjectInput<R>
  | CustomField<any, R>
  | SchemaField<R, any>
  | ChacaSchema<R>
  | RefField;

export type FieldTypeInput<R> =
  | SchemaField<R, any>
  | ChacaSchema<R>
  | RefField
  | CustomField<any, R>;

type FieldObjectInput<R> = {
  type?: FieldTypeInput<R>;
  isArray?: boolean | number | { min?: number; max?: number };
  posibleNull?: boolean | number;
  enum?: R[];
};

export type CustomField<C, R> = (docFields: C, store: DatasetStore) => R;

export interface CommonSchema {
  isArray: FieldIsArrayConfig;
  posibleNull: number;
}

export type FieldIsArrayConfig = { min: number; max: number } | null;

export class IResolver {}
