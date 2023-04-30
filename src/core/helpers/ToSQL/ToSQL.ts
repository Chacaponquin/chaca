import { MultiGenerateSchema } from "../MultiGenerate/MultiGenerate.js";
import { ToSQLResolver } from "./classes/ToSQLResolver.js";
import { ToSQLConfig } from "./interfaces/toSQL.interface.js";

export async function ToSQL(
  schemas: Array<MultiGenerateSchema>,
  config: ToSQLConfig,
): Promise<string> {
  return await new ToSQLResolver(schemas, config).resolve();
}

export type { ToSQLConfig };
