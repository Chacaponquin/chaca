import { ExportSQLFormat } from "../../interfaces/export";
import { Generator } from "../generator";
import { PostgreSQL } from "./core/generators/postgres";
import { DatasetResolver } from "../../../dataset-resolver/resolver";
import { Filename } from "../generator/name";
import { SQLDataGenerator } from "./core/generators/base";
import { SQLTables } from "./core/table/tables";
import { DataValidator } from "./core/generators/validator";
import { TableOrganizer } from "./core/generators/organizer";
import { TablesFixer } from "./core/generators/fixer";
import { ChacaUtils } from "../../../utils";
import { IndentConfig, SkipInvalidConfig, ZipConfig } from "../params";
import { SpaceIndex } from "../../core/space-index";
import { SkipInvalid } from "../../core/skip-invalid";

export type SQLProps = ZipConfig & IndentConfig & SkipInvalidConfig;

export class SQLGenerator extends Generator {
  private readonly zip: boolean;
  private readonly indent: SpaceIndex;
  private readonly skipInvalid: SkipInvalid;

  constructor(
    utils: ChacaUtils,
    filename: string,
    location: string,
    format: ExportSQLFormat,
    config: SQLProps,
  ) {
    super(utils, {
      extension: "sql",
      filename: filename,
      location: location,
    });

    this.zip = Boolean(config.zip);
    this.indent = new SpaceIndex(config.indent);
    this.skipInvalid = new SkipInvalid(config.skipInvalid);
  }

  async createRelationalFile(resolver: DatasetResolver): Promise<string[]> {
    const filename = new Filename(this.filename);

    const route = this.generateRoute(filename);

    const fixer = new TablesFixer(this.utils, {
      keys: resolver.getKeyNodes(),
      nulls: resolver.getPossibleNullNodes(),
      refs: resolver.getRefsNodes(),
    });
    const allTables = new SQLTables(this.utils);
    const organizer = new TableOrganizer();

    const validator = new DataValidator();
    const postgres = new PostgreSQL(this.indent);
    const generator = new SQLDataGenerator(
      this.utils,
      postgres,
      validator,
      fixer,
      this.skipInvalid,
    );

    const resolvers = organizer.execute({ resolver: resolver });

    resolvers.forEach((r) => {
      const tables = new SQLTables(this.utils);

      generator.build({
        name: r.getSchemaName(),
        data: r.resolve(),
        tables: tables,
        generateIds: false,
      });

      tables.tables.forEach((t) => allTables.add(t));
    });

    const code = generator.code(allTables);

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

    const fixer = new TablesFixer(this.utils, {
      keys: [],
      nulls: [],
      refs: [],
    });

    const tables = new SQLTables(this.utils);
    const validator = new DataValidator();
    const postgres = new PostgreSQL(this.indent);
    const generator = new SQLDataGenerator(
      this.utils,
      postgres,
      validator,
      fixer,
      this.skipInvalid,
    );

    generator.build({
      name: this.filename,
      data: data,
      tables: tables,
      generateIds: true,
    });

    const code = generator.code(tables);

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
