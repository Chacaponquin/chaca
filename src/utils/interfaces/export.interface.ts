import { ReturnValue } from "./value.interface";

export type ExportFormat =
  | "json"
  | "java"
  | "typescript"
  | "csv"
  | "javascript";

export interface FileConfig {
  location: string;
  fileName: string;
  format: ExportFormat;
}

export type ReturnDoc = { [key: string]: ReturnValue | ReturnValue[] };
