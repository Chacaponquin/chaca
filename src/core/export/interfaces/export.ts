import { CsvProps } from "../generators/csv/csv-generator";
import { JavaProps } from "../generators/java/java-generator";
import { JavascriptProps } from "../generators/javascript/javascript-generator";
import { JsonProps } from "../generators/json/json-generator";
import { PythonProps } from "../generators/python/python-generator";
import { SQLProps } from "../generators/sql/sql-generator";
import { TypescriptProps } from "../generators/typescript/typescript-generator";
import { YamlProps } from "../generators/yaml/yaml-generator";

/** Export files extensions */
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
export type FileConfig = {
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
   * File extension configuration (`'java'` | `'csv'` | `'typescript'` | `'json'` | `'javascript'` | `'yaml'` | `'postgresql'` | `'python'`)
   * @example { format: 'csv' }
   */
  format: ExportFormat;

  /** Show log in console progretion */
  verbose?: boolean;
};

export type DumpConfig = Omit<FileConfig, "location">;

/**
 * Contract the CLI relies on to export a config module without knowing whether
 * it is a `Schema` or a `Dataset`. Each implementation adapts the uniform
 * `(documents, config)` call to its own export signature (a `Dataset` ignores
 * the document count). This keeps the CLI free of type discrimination.
 */
export interface CliExportable {
  exportFromCli(documents: number, config: FileConfig): Promise<string[]>;
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
} & SQLProps;

export type PythonFormatConfig = {
  ext: "python";
} & PythonProps;

export type YamlFormatConfig = {
  ext: "yaml";
} & YamlProps;

export type JavascriptFormatConfig = {
  ext: "javascript";
} & JavascriptProps;

export type TypescriptFormatConfig = {
  ext: "typescript";
} & TypescriptProps;

export type JsonFormatConfig = {
  ext: "json";
} & JsonProps;

export type CsvFormatConfig = {
  ext: "csv";
} & CsvProps;

export type JavaFormatConfig = {
  ext: "java";
} & JavaProps;
