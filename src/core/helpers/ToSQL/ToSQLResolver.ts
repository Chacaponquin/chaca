import { SQLGenerator } from "../../../generators/index.js";
import { MultiGenerateSchema } from "../MultiGenerate/MultiGenerate.js";
import { MultiGenerateResolver } from "../MultiGenerate/classes/MultiGenerateResolver.js";
import { ToSQLConfig } from "./interfaces/toSQL.interface.js";

export class ToSQLResolver {
  constructor(schemas: Array<MultiGenerateSchema>, config: ToSQLConfig) {
    const multiResolver = new MultiGenerateResolver(schemas);

    const resolvers = multiResolver.getResolvers();
    const data = multiResolver.resolve();

    const sqlGenerator = new SQLGenerator(data, {
      fileName: config.fileName,
      location: config.location,
      format: "sql",
    });
  }
}
