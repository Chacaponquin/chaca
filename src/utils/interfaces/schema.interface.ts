import { SchemaField } from "../SchemaField";
import { ReturnValue } from "./value.interface";

export type SchemaConfig = {
  type?: SchemaField;
  isArray?: boolean | number | { min: number; max: number };
  posibleNull?: boolean | number;
  custom?: () => ReturnValue;
  enum?: ReturnValue[];
};

export interface SchemaObject {
  [path: string]: SchemaConfig;
}
