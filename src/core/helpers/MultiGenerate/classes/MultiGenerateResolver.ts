import { ChacaError } from "../../../../errors/ChacaError.js";
import { SchemaResolver } from "../../../classes/SchemaResolver.js";
import { MultiGenerateSchema } from "../interfaces/multiGenerate.interface.js";

export class MultiGenerateResolver<K> {
  private resolversArray: Array<SchemaResolver> = [];

  constructor(schemas: Array<MultiGenerateSchema>) {
    this.validateNotRepeatSchemaNames(schemas);
    this.createSchemaResolvers(schemas);
    this.injectSchemas();
    this.buildInputTrees();
    this.buildRefFields();
  }

  public getResolvers() {
    return this.resolversArray;
  }

  private validateNotRepeatSchemaNames(
    schemas: Array<MultiGenerateSchema>,
  ): void {
    for (let i = 0; i < schemas.length; i++) {
      const notRepeat =
        schemas.filter((s) => s.name.trim() === schemas[i].name.trim())
          .length === 1;

      if (!notRepeat) {
        throw new ChacaError(
          `The name ${schemas[i].name} is repeat. Your schemas must have different names`,
        );
      }
    }
  }

  private buildRefFields() {
    this.resolversArray.forEach((r) => r.searchRefNodes());
  }

  private createSchemaResolvers(schemas: Array<MultiGenerateSchema>): void {
    this.resolversArray = schemas.map((s, index) => {
      if (typeof s === "object" && s !== null) {
        return new SchemaResolver(
          s.name,
          s.schema.getSchemaObject(),
          s.documents,
          index,
        );
      } else {
        throw new ChacaError("You must provide a name for your schema");
      }
    });
  }

  private injectSchemas(): void {
    // inyectar los schema resolvers restantes a cada schema resolver
    for (const resolver of this.resolversArray) {
      resolver.setInjectedSchemas(this.resolversArray);
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
