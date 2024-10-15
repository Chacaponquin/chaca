import { ExportSQLFormat } from "../../interfaces/export";
import { Generator } from "../generator";
import { PostgreSQL } from "./core/generators/postgres";
import { DatasetResolver } from "../../../dataset-resolver/resolver";
import { Filename } from "../generator/name";
import { SQLDataGenerator } from "./core/generators/base";
import { SQLTables } from "./core/table/tables";
import { DataValidator } from "./core/generators/validator";

export interface SQLProps {
  zip?: boolean;
}

export class SQLGenerator extends Generator {
  private generator: SQLDataGenerator;

  private readonly zip: boolean;

  constructor(
    filename: string,
    location: string,
    format: ExportSQLFormat,
    config: SQLProps,
  ) {
    super({
      extension: "sql",
      filename: filename,
      location: location,
    });

    const generator = new PostgreSQL();
    const validator = new DataValidator();
    this.generator = new SQLDataGenerator(this.utils, generator, validator);

    this.zip = Boolean(config.zip);
  }

  async createRelationalFile(resolvers: DatasetResolver): Promise<string[]> {
    const filename = new Filename(this.filename);
    const route = this.generateRoute(filename);

    const allTables = new SQLTables(this.utils);

    resolvers.getResolvers().forEach((r) => {
      const tables = new SQLTables(this.utils);

      this.generator.build({
        name: r.getSchemaName(),
        data: r.resolve(),
        tables: tables,
        config: {
          keys: r.getKeyNodes(),
          refs: r.getRefNodes(),
          nulls: r.getPossibleNullNodes(),
        },
      });

      for (const table of tables.tables) {
        allTables.add(table);
      }
    });

    const code = this.generator.code(allTables);

    await this.writeFile(route, code);

    if (this.zip) {
      const zip = this.createZip();
      zip.add(route);

      return [zip.route];
    } else {
      return [route.value()];
    }
  }

  async createFile(data: any): Promise<string[]> {
    const filename = new Filename(this.filename);
    const route = this.generateRoute(filename);

    const tables = new SQLTables(this.utils);

    this.generator.build({
      name: this.filename,
      data: data,
      tables: tables,
      config: { keys: [], nulls: [], refs: [] },
    });

    const code = this.generator.code(tables);

    await this.writeFile(route, code);

    if (this.zip) {
      const zip = this.createZip();
      zip.add(route);

      return [zip.route];
    } else {
      return [route.value()];
    }
  }
}
