import { SchemaField } from "../../schemas/SchemaField";
import { SchemaResolver } from "../classes/SchemaResolver";

export type SchemaConfig =
  | SchemaInput
  | SchemaField
  | CustomField
  | SchemaResolver;

export type SchemaInput = {
  type?: SchemaField | SchemaResolver;
  isArray?: boolean | number | { min?: number; max?: number };
  posibleNull?: boolean | number;
  custom?: CustomField;
  enum?: unknown[];
};

export interface SchemaToResolve extends CommonSchema {
  type: IResolver;
}

export type CustomField<T = any> = (docFields: T) => any;

export interface CommonSchema {
  isArray: { min: number; max: number } | null;
  posibleNull: number;
}

export interface IResolver {
  resolve(field: any): Generator<any, unknown>;
}

export interface SchemaObject<T> {
  [path: string]: T;
}
