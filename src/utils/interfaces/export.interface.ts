export type ExportFormat =
  | "json"
  | "java"
  | "typescript"
  | "csv"
  | "javascript";

export interface FileConfig {
  location: string;
}
