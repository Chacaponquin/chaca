import {
  GenerateConfig,
  MultiGenerateSchema,
} from "./interfaces/multiGenerate.interface.js";
import { MultiGenerateResolver } from "./classes/MultiGenerateResolver.js";

/**
 * Generate data from realtional schemas
 * @param schemas Array with the schemas config
 * @param config.verbose Show log in console progretion
 */
export function MultiGenerate<K = any>(
  schemas: Array<MultiGenerateSchema>,
  config?: GenerateConfig,
): K {
  const resolver = new MultiGenerateResolver<K>(schemas, config);
  return resolver.resolve();
}

export type { MultiGenerateSchema, GenerateConfig };
