/** Export files extendsions */
export type ExportFormat = Extensions | ExtensionConfigs;

export type Extensions =
  | "json"
  | "java"
  | "typescript"
  | "csv"
  | "javascript"
  | "yaml"
  | "python"
  | ExportSQLFormat;

export type ExportSQLFormat = "postgresql";

/**
 * Export File Configuration
 */
export interface FileConfig {
  /**
   * Name for the file
   */
  fileName: string;
  /**
   * Location of the file
   * @example
   * { location: './data' }
   */
  location: string;
  /**
   * File extension (`'java'` | `'csv'` | `'typescript'` | `'json'` | `'javascript'` | `'yaml'` | `'postgresql'` | `'python'`)
   * @example { format: 'csv' }
   */
  format: ExportFormat;
}

export type ExtensionConfigs = JsonFormatConfig | CsvFormatConfig;

export type JsonFormatConfig = {
  ext: "json";
  separate: boolean;
  zip: boolean;
};

export type CsvFormatConfig = {
  ext: "csv";
  zip: boolean;
};
