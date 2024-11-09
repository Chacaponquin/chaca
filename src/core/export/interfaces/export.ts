import { CsvProps } from "../generators/csv";
import { JavaProps } from "../generators/java";
import { JavascriptProps } from "../generators/javascript";
import { JsonProps } from "../generators/json";
import { PythonProps } from "../generators/python";
import { SQLProps } from "../generators/sql";
import { TypescriptProps } from "../generators/typescript";
import { YamlProps } from "../generators/yaml";

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
