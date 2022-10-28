import { SchemaField } from "../../schemas/SchemaField";
import { ReturnValue } from "./value.interface";

export type SchemaConfig = {
  type?: SchemaField;
  isArray?: boolean | number | { min: number; max: number };
  posibleNull?: boolean | number;
  custom?: (docFields: any) => any;
  enum?: ReturnValue[];
};

export interface SchemaObject {
  [path: string]: SchemaConfig;
}
