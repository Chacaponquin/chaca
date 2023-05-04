import { SchemaField } from "../../schemas/SchemaField.js";
import { ChacaSchema } from "../classes/ChacaSchema/ChacaSchema.js";
import { RefFieldResolver } from "../classes/Resolvers/index.js";
import { SequentialField } from "../classes/SequentialField/SequentialField.js";
import { KeyField } from "../classes/KeyField/KeyField.js";
import { SchemaStore } from "../classes/SchemasStore/SchemaStore.js";

export type SchemaInput<T> = {
  [key in keyof T]: FieldSchemaConfig<T[key]> | SequentialField | KeyField;
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
  | RefFieldResolver;

type FieldObjectInput<R> = {
  type?: SchemaField<R, any> | ChacaSchema<R> | RefFieldResolver;
  isArray?: boolean | number | { min?: number; max?: number };
  posibleNull?: boolean | number;
  custom?: CustomField<any, R>;
  enum?: R[];
  ref?: RefFieldResolver;
};

export type CustomField<C, V> = (docFields: C, schemas: SchemaStore) => V;

export interface CommonSchema {
  isArray: FieldIsArrayConfig;
  posibleNull: number;
}

export type FieldIsArrayConfig = { min: number; max: number } | null;

export class IResolver {}
