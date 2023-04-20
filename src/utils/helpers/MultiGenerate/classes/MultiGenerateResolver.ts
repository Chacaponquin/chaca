import { ChacaError } from "../../../../errors/ChacaError.js";
import { SchemaResolver } from "../../../classes/SchemaResolver.js";
import { MultiGenerateSchema } from "../interfaces/multiGenerate.interface.js";

export class MultiGenerateResolver<K> {
  private resolversArray: Array<SchemaResolver>;

  constructor(schemas: Array<MultiGenerateSchema>) {
    this.resolversArray = this.createSchemaResolvers(schemas);
    this.injectSchemas();
    this.buildInputTrees();
  }

  private createSchemaResolvers(
    schemas: Array<MultiGenerateSchema>,
  ): Array<SchemaResolver> {
    return schemas.map((s) => {
      if (typeof s === "object" && s !== null) {
        return new SchemaResolver(
          s.name,
          s.schema.getSchemaObject(),
          s.documents,
        );
      } else {
        throw new ChacaError("You must provide a name for your schema");
      }
    });
  }

  private injectSchemas(): void {
    // inyectar los schema resolvers restantes a cada schema resolver
    for (const resolver of this.resolversArray) {
      const otherResolvers = this.resolversArray.filter((r) => r !== resolver);
      resolver.setInjectedSchemas(otherResolvers);
    }
  }

  private buildInputTrees(): void {
    this.resolversArray.forEach((r) => r.buildInputTree());
  }

  public resolve(): K {
    let data = {} as K;

    this.resolversArray.forEach((r) => {
      data = { ...data, [r.getSchemaName()]: r.resolve() };
    });

    return data;
  }
}
