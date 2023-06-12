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

    const resolvers = multiResolver.getResolvers();
    const data = multiResolver.resolve();

    const sqlGenerator = new SQLGenerator(
      data,
      {
        fileName: this.config.fileName,
        location: this.config.location,
        format: "postgresql",
      },
      "postgresql",
    );

    await sqlGenerator.generateRelationalDataFile(resolvers);

    return sqlGenerator.getRoute();
  }
}
