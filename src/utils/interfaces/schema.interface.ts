import { SchemaField } from "../../schemas/SchemaField.js";
import { Schema } from "../classes/schemas/Schema/Schema.js";

export type SchemaInput<C, T> = {
  [key in keyof T]: FieldSchemaConfig<C, T[key]>;
};

export type SchemaToResolve<C, T> = {
  [key in keyof T]: ResolverObject<C, T[key]>;
};

export type ResolverObject<C, R> = {
  type: IResolver<C, R>;
  isArray: { min: number; max: number } | null;
  posibleNull: number;
};

export type FieldSchemaConfig<C, R> =
  | FieldObjectInput<C, R>
  | CustomField<C, R>
  | SchemaField<R, any>
  | Schema<R>;

type FieldObjectInput<C, R> = {
  type?: SchemaField<R, any> | Schema<R>;
  isArray?: boolean | number | { min?: number; max?: number };
  posibleNull?: boolean | number;
  custom?: CustomField<C, R>;
  enum?: R[];
};

export type CustomField<C, V> = (docFields: C) => V;

export interface CommonSchema {
  isArray: { min: number; max: number } | null;
  posibleNull: number;
}

export interface IResolver<C, R> {
  resolve(field: C): R;
}
