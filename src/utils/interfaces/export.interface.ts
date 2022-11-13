export type ExportFormat =
  | "json"
  | "java"
  | "typescript"
  | "csv"
  | "javascript";

interface FileConfigCommon {
  /**
   * Location of the file
   * @example
   * { location: './data' }
   */
  location: string;
  /**
   * File extension (`'java'` | `'csv'` | `'typescript'` | `'json'` | `'javascript'`)
   *
   * - `'java'`
   * Export a zip file with the classes files and the main java file with the initialization of data
   *
   * - `'csv'`
   * Export a csv file with the data created
   *
   * - `'typescript'`
   * Export a ts file with the data created
   *
   * - `'javascript'`
   * Export a js file with the data created
   *
   * - `'json'`
   * Export a json file with the data created
   *
   * @example { format: 'csv' }
   */
  format: ExportFormat;
}

export interface ExportAllConfig extends FileConfigCommon {
  /**
   * Name of the zip file
   */
  zipName: string;
}

/**
 * Export File Configuration
 */
export interface FileConfig extends FileConfigCommon {
  /**
   * Name of the file
   */
  fileName: string;
}
