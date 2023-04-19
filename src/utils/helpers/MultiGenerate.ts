import { ChacaSchema } from "../classes/ChacaSchema/ChacaSchema.js";
import { SchemaResolver } from "../classes/SchemaResolver.js";

export interface MultiGenerateSchema {
  name: string;
  schema: ChacaSchema;
  documents: number;
}

export function MultiGenerate(schemas: Array<MultiGenerateSchema>) {
  const resolversArray = schemas.map(
    (s) =>
      new SchemaResolver(s.name, s.schema.getSchemaObject(), [], s.documents),
  );

  for (const resolver of resolversArray) {
    const otherResolvers = resolversArray.filter((r) => r !== resolver);
    resolver.setInjectedSchemas(otherResolvers);
  }
}
