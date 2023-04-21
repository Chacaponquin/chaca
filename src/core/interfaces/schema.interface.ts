import { SchemaField } from "../../schemas/SchemaField.js";
import { ChacaSchema } from "../classes/ChacaSchema/ChacaSchema.js";
import { SequentialFieldResolver } from "../classes/Resolvers/SequentialFieldResolver/SequentialFieldResolver.js";
import { RefFieldResolver } from "../classes/Resolvers/index.js";
import { SequentialField } from "../classes/SequentialField/SequentialField.js";

export type SchemaInput<C, T> = {
  [key in keyof T]: FieldSchemaConfig<C, T[key]> | SequentialField;
};

export type SchemaToResolve<T> = {
  [key in keyof T]: ResolverObject | SequentialFieldResolver;
};

export type ResolverObject = {
  type: IResolver;
  isArray: { min: number; max: number } | null;
  posibleNull: number;
};

export type FieldSchemaConfig<C, R> =
  | FieldObjectInput<C, R>
  | CustomField<C, R>
  | SchemaField<R, any>
  | ChacaSchema<R>
  | RefFieldResolver;

type FieldObjectInput<C, R> = {
  type?: SchemaField<R, any> | ChacaSchema<R>;
  isArray?: boolean | number | { min?: number; max?: number };
  posibleNull?: boolean | number;
  custom?: CustomField<C, R>;
  enum?: R[];
  ref?: RefFieldResolver;
};

export type CustomField<C, V> = (docFields: C) => V;

export interface CommonSchema {
  isArray: FieldIsArrayConfig;
  posibleNull: number;
}

export type FieldIsArrayConfig = { min: number; max: number } | null;

export class IResolver {}
