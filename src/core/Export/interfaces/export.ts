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
  /**
   * If is `true`, the data generated from each schema will be placed in independent files
   */
  separate: boolean;
  /**
   * Boolean indicating whether all generated files are compressed into a zip
   */
  zip: boolean;
};

export type CsvFormatConfig = {
  ext: "csv";
  /**
   * Boolean indicating whether all generated files are compressed into a zip
   */
  zip: boolean;
};
