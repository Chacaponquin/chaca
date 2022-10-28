export type ExportFormat =
  | "json"
  | "java"
  | "typescript"
  | "csv"
  | "javascript";

/**
 * Export File Configuration
 */
export interface FileConfig {
  location: string;
  fileName: string;
  /**
   * Format to export the file
   *
   * @param java
   * Export a zip file with the classes files and the main java file with the initialization of data
   *
   * @param csv
   * Export a csv file with the data created
   *
   * @param typescript
   * Export a ts file with the data created
   *
   * @param javascript
   * Export a js file with the data created
   *
   * @param json
   * Export a json file with the data created
   *
   * @example { format: 'csv' }
   */
  format: ExportFormat;
}
