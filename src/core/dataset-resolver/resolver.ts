import { ChacaError } from "../../errors";
import { InputTreeNode, KeyValueNode, RefValueNode } from "../input-tree/core";
import { SchemaResolver } from "../schema-resolver";
import { DatasetSchema } from "./interfaces/resolver";

interface Props {
  schemas: DatasetSchema[];
  verbose: boolean;
}

export class DatasetResolver<K = any> {
  private resolvers: SchemaResolver[] = [];
  private readonly verbose: boolean;

  constructor({ schemas, verbose }: Props) {
    this.verbose = verbose;
    this.createSchemaResolvers(schemas);
    this.validateNotRepeatSchemaNames(schemas);
    this.injectSchemas();
    this.buildInputTrees();
    this.buildRefFields();
  }

  getResolvers() {
    return this.resolvers;
  }

  private validateNotRepeatSchemaNames(schemas: DatasetSchema[]): void {
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
    this.resolvers.forEach((r) => r.searchRefNodes());
  }

  private createSchemaResolvers(schemas: DatasetSchema[]): void {
    this.resolvers = schemas.map((schema, schemaIndex) => {
      if (typeof schema === "object" && schema !== null) {
        return new SchemaResolver({
          name: schema.name,
          schemaObject: schema.schema.getSchemaObject(),
          countDoc: schema.documents,
          schemaIndex: schemaIndex,
          consoleVerbose: this.verbose,
        });
      } else {
        const message = `You must provide a object with the schema configuration. Example: { name: 'User', schema: UserSchema, documents: 50 }`;
        throw new ChacaError(message);
      }
    });
  }

  private injectSchemas(): void {
    // inyectar los schema resolvers restantes a cada schema resolver
    for (const resolver of this.resolvers) {
      resolver.setInjectedSchemas(this.resolvers);
    }
  }

  private buildInputTrees(): void {
    this.resolvers.forEach((r) => r.buildInputTree());
  }

  resolve(): K {
    let data = {} as K;

    this.resolvers.forEach((r) => {
      data = { ...data, [r.getSchemaName()]: r.resolve() };
    });

    return data;
  }

  getRefsNodes() {
    const nodes = [] as RefValueNode[];

    this.resolvers.forEach((r) => {
      nodes.push(...r.getRefNodes());
    });

    return nodes;
  }

  getPossibleNullNodes() {
    const nodes = [] as InputTreeNode[];

    this.resolvers.forEach((r) => {
      nodes.push(...r.getPossibleNullNodes());
    });

    return nodes;
  }

  getKeyNodes() {
    const nodes = [] as KeyValueNode[];

    this.resolvers.forEach((r) => {
      nodes.push(...r.getKeyNodes());
    });

    return nodes;
  }
}
