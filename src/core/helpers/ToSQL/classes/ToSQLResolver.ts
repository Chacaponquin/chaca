import { SQLGenerator } from "../../../../generators/index.js";
import { MultiGenerateSchema } from "../../MultiGenerate/MultiGenerate.js";
import { MultiGenerateResolver } from "../../MultiGenerate/classes/MultiGenerateResolver.js";
import { ToSQLConfig } from "../interfaces/toSQL.interface.js";

export class ToSQLResolver {
  private schemas: Array<MultiGenerateSchema>;
  private config: ToSQLConfig;

  constructor(schemas: Array<MultiGenerateSchema>, config: ToSQLConfig) {
    this.schemas = schemas;
    this.config = config;
  }

  public async resolve(): Promise<string> {
    const multiResolver = new MultiGenerateResolver(this.schemas);

    const sqlGenerator = new SQLGenerator({
      fileName: this.config.fileName,
      location: this.config.location,
      format: "postgresql",
    });

    await sqlGenerator.generateRelationalDataFile(multiResolver);

    return sqlGenerator.getRoute();
  }
}
