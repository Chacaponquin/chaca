import {
  GenerateConfig,
  MultiGenerateSchema,
} from "./interfaces/multiGenerate.interface.js";
import { MultiGenerateResolver } from "./classes/MultiGenerateResolver.js";

export function MultiGenerate<K = any>(
  schemas: Array<MultiGenerateSchema>,
  config?: Partial<GenerateConfig>,
): K {
  const data = new MultiGenerateResolver<K>(schemas, config).resolve();
  return data;
}

export type { MultiGenerateSchema, GenerateConfig };
