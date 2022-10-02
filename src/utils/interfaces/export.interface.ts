import { ReturnValue } from "./value.interface";

export type ExportFormat =
  | "json"
  | "java"
  | "typescript"
  | "csv"
  | "javascript";

export interface FileConfig {
  location: string;
  nameFile: string;
}

export type ReturnDoc = { [key: string]: ReturnValue | ReturnValue[] };
