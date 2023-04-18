import { ChacaSchema } from "../classes/ChacaSchema/ChacaSchema.js";
import { SchemaResolver } from "../classes/SchemaResolver.js";

export interface MultiGenerateSchema {
  name: string;
  schema: ChacaSchema;
  documents: number;
}

export function MultiGenerate(schemas: Array<MultiGenerateSchema>) {
  const array = schemas.map(
    (s) => new SchemaResolver(s.schema.getSchemaObject()),
  );

  array[0].resolve(5);
}
