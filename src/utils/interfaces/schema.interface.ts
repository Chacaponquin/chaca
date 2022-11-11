import { SchemaField } from "../../schemas/SchemaField";
import { SchemaResolver } from "../classes/SchemaResolver";

export type FieldSchemaConfig<T, V> =
  | {
      type?: SchemaField<V, any> | SchemaResolver<V>;
      isArray?: boolean | number | { min?: number; max?: number };
      posibleNull?: boolean | number;
      custom?: CustomField<T, V>;
      enum?: unknown[];
    }
  | CustomField<T, V>
  | SchemaField<V, any>
  | SchemaResolver<V>;

export type SchemaInput<T> = {
  [key in keyof T]: FieldSchemaConfig<T, T[key]>;
};

export type ResolverObject<T> = {
  type: IResolver<T>;
  isArray: { min: number; max: number } | null;
  posibleNull: number;
};

export type SchemaToResolve<T> = {
  [key in keyof T]: ResolverObject<T>;
};

export type CustomField<A, V> = (docFields: A) => V;

export interface CommonSchema {
  isArray: { min: number; max: number } | null;
  posibleNull: number;
}

export interface IResolver<T> {
  resolve(field: T): Generator<any, unknown>;
}
