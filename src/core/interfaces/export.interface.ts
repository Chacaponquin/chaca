export type ExportFormat =
  | "json"
  | "java"
  | "typescript"
  | "csv"
  | "javascript"
  | "yaml"
  | ExportSQLFormat;

export type ExportSQLFormat = "postgresql";

/**
 * Export File Configuration
 */
export interface FileConfig {
  /**
   * Name of the file
   */
  fileName: string;
  /**
   * Location of the file
   * @example
   * { location: './data' }
   */
  location: string;
  /**
   * File extension (`'java'` | `'csv'` | `'typescript'` | `'json'` | `'javascript'` | `'yaml' | `'postgresql'`)
   * @example { format: 'csv' }
   */
  format: ExportFormat;
}
