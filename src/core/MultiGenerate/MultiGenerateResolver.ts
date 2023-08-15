import { ChacaError } from "../../errors/ChacaError.js";
import { SchemaResolver } from "../SchemaResolver/SchemaResolver.js";
import {
  GenerateConfig,
  MultiGenerateSchema,
} from "./interfaces/multiGenerate.interface.js";
import { GenerateConfigObject } from "./value-object/index.js";

export class MultiGenerateResolver<K = any> {
  private resolversArray: Array<SchemaResolver> = [];
  private config: Required<GenerateConfig>;

  constructor(schemas: Array<MultiGenerateSchema>, config?: GenerateConfig) {
    this.config = new GenerateConfigObject(config).value();
    this.createSchemaResolvers(schemas);
    this.validateNotRepeatSchemaNames(schemas);
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
    this.resolversArray = schemas.map((schema, schemaIndex) => {
      if (typeof schema === "object" && schema !== null) {
        return new SchemaResolver({
          schemaName: schema.name,
          schemaObject: schema.schema.getSchemaObject(),
          countDoc: schema.documents,
          schemaIndex: schemaIndex,
          consoleVerbose: this.config.verbose,
        });
      } else {
        throw new ChacaError(
          "You must provide a object with the schema configuration. Example: { name: 'User', schema: UserSchema, documents: 50 }",
        );
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
