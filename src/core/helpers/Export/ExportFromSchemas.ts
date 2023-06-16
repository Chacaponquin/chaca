import { FileConfig } from "../../interfaces/export.interface.js";
import { MultiGenerateSchema } from "../MultiGenerate/MultiGenerate.js";
import { ExportResolver } from "./ExportResolver.js";

export async function ExportFromSchemas(
  schemas: Array<MultiGenerateSchema>,
  config: FileConfig,
): Promise<string> {
  const exportResolver = new ExportResolver(config);
  return await exportResolver.exportRelationalSchemas(schemas);
}
