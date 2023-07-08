import { FileConfig } from "../../interfaces/export.interface.js";
import {
  GenerateConfig,
  MultiGenerateSchema,
} from "../MultiGenerate/MultiGenerate.js";
import { ExportResolver } from "./ExportResolver.js";

/**
 * Generate data from realtional schemas
 * @param schemas Array with the schemas config
 * @param fileConfig.fileName file name
 * @param fileConfig.location location of the file
 * @param fileConfig.format file extension (`'java'` | `'csv'` | `'typescript'` | `'json'` | `'javascript'` | `'yaml'` | `'postgresql'`)
 * @param genConfig.verbose Show log in console progretion
 */
export async function ExportFromSchemas(
  schemas: Array<MultiGenerateSchema>,
  fileConfig: FileConfig,
  genConfig?: GenerateConfig,
): Promise<string> {
  const exportResolver = new ExportResolver(fileConfig);
  return await exportResolver.exportRelationalSchemas(schemas, genConfig);
}
