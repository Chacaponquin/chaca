import { SchemaField } from "../../schemas/SchemaField.js";
import { ChacaSchema } from "../classes/ChacaSchema/ChacaSchema.js";
import { SequentialField } from "../classes/SequentialField/SequentialField.js";
import { KeyField } from "../classes/KeyField/KeyField.js";
import { RefField } from "../classes/RefField/RefField.js";
import { SequenceField } from "../classes/SequenceField/SequenceField.js";
import { DatasetStore } from "../classes/DatasetStore/DatasetStore.js";
import { SchemaData } from "../classes/SchemaData/SchemaData.js";
import { EnumField } from "../classes/EnumField/EnumField.js";

export type SchemaInputField<T> =
  | FieldSchemaConfig<T>
  | SequentialField
  | KeyField
  | SequenceField;

export type FieldSchemaConfig<R> =
  | FieldObjectInput<R>
  | CustomField<any, R>
  | SchemaField<R, any>
  | ChacaSchema<R>
  | RefField
  | EnumField<R>;

export type SchemaInput<T> = {
  [key in keyof T]: SchemaInputField<T[key]>;
};

export type SchemaToResolve<T> = {
  [key in keyof T]: ResolverObject;
};

export type ResolverObject = {
  type: IResolver;
  isArray: { min: number; max: number } | null;
  posibleNull: number;
};

export type FieldTypeInput<R> =
  | SchemaField<R, any>
  | ChacaSchema<R>
  | RefField
  | CustomField<any, R>
  | EnumField<R>;

type FieldObjectInput<R> = {
  type?: FieldTypeInput<R>;
  isArray?: boolean | number | { min?: number; max?: number };
  posibleNull?: boolean | number;
};

export type CustomField<C, R> = (args: {
  currentFields: C;
  store: DatasetStore;
  schemaRestDocuments: SchemaData<C>;
}) => R;

export interface CommonSchema {
  isArray: FieldIsArrayConfig;
  posibleNull: number;
}

export type FieldIsArrayConfig = { min: number; max: number } | null;

export class IResolver {}
