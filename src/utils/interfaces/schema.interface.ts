import { SchemaField } from "../../schemas/SchemaField";
import { ReturnValue } from "./value.interface";

export type SchemaConfig = SchemaDefaultConfig | SchemaField | CustomField;

export type CustomField = (docFields: any) => any;

export type SchemaDefaultConfig = {
  type?: SchemaField;
  isArray?: boolean | number | { min: number; max: number };
  posibleNull?: boolean | number;
  custom?: CustomField;
  enum?: ReturnValue[];
};

export interface SchemaObject<T> {
  [path: string]: T;
}
