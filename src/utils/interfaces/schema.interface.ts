import { SchemaField } from "../../schemas/SchemaField";
import { SchemaResolver } from "../classes/SchemaResolver";

export type SchemaInput<C, T> = {
  [key in keyof T]: FieldSchemaConfig<Omit<C, key>, T[key]>;
};

export type SchemaToResolve<T> = {
  [key in keyof T]: ResolverObject<T[key]>;
};

export type ResolverObject<R> = {
  type: IResolver<R>;
  isArray: { min: number; max: number } | null;
  posibleNull: number;
};

export type FieldSchemaConfig<C, R> =
  | FieldObjectInput<C, R>
  | CustomField<C, R>
  | SchemaField<R, any>
  | SchemaResolver<R>;

type FieldObjectInput<C, R> = {
  type?: SchemaField<R, any> | SchemaResolver<R>;
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

export interface IResolver<R> {
  resolve(field: any): Generator<R>;
}
