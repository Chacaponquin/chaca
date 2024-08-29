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
 * Export file configuration
 */
export interface FileConfig {
  /**
   * Name for the file
   */
  filename: string;

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

  /** Show log in console progretion */
  verbose?: boolean;
}

export type ExtensionConfigs =
  | JsonFormatConfig
  | CsvFormatConfig
  | JavaFormatConfig
  | TypescriptFormatConfig
  | JavascriptFormatConfig
  | YamlFormatConfig
  | PythonFormatConfig
  | PostgresqlFormatConfig;

export type PostgresqlFormatConfig = {
  ext: "postgresql";
  /**
   * Boolean indicating whether all generated files are compressed into a zip
   */
  zip?: boolean;
};

export type PythonFormatConfig = {
  ext: "python";
  /**
   * Boolean indicating whether all generated files are compressed into a zip
   */
  zip?: boolean;
};

export type YamlFormatConfig = {
  ext: "yaml";
  /**
   * Boolean indicating whether all generated files are compressed into a zip
   */
  zip?: boolean;
};

export type JavascriptFormatConfig = {
  ext: "javascript";
  /**
   * Boolean indicating whether all generated files are compressed into a zip
   */
  zip?: boolean;
};

export type TypescriptFormatConfig = {
  ext: "typescript";
  /**
   * Boolean indicating whether all generated files are compressed into a zip
   */
  zip?: boolean;
};

export type JsonFormatConfig = {
  ext: "json";
  /**
   * If is `true`, the data generated from each schema will be placed in independent files
   */
  separate?: boolean;
  /**
   * Boolean indicating whether all generated files are compressed into a zip
   */
  zip?: boolean;
};

export type CsvFormatConfig = {
  ext: "csv";
  /**
   * Boolean indicating whether all generated files are compressed into a zip
   */
  zip?: boolean;
};

export type JavaFormatConfig = {
  ext: "java";
  /**
   * Boolean indicating whether all generated files are compressed into a zip
   */
  zip?: boolean;
};
