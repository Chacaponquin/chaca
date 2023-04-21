import { MultiGenerateSchema } from "./interfaces/multiGenerate.interface.js";
import { MultiGenerateResolver } from "./classes/MultiGenerateResolver.js";

export function MultiGenerate<K = any>(schemas: Array<MultiGenerateSchema>): K {
  const data = new MultiGenerateResolver<K>(schemas).resolve();
  return data;
}

export type { MultiGenerateSchema };
