import { ExportSQLFormat } from "../../interfaces/export";
import {
  DumpFile,
  DumpProps,
  DumpRelationalProps,
  Generator,
} from "../generator";
import { PostgreSQL } from "./core/generators/postgres";
import { DatasetResolver } from "../../../dataset-resolver/resolver";
import { SQLDataGenerator } from "./core/generators/base";
import { SQLTables } from "./core/table/tables";
import { DataValidator } from "./core/generators/validator";
import { TableOrganizer } from "./core/generators/organizer";
import { TablesFixer } from "./core/generators/fixer";
import { ChacaUtils } from "../../../utils";
import { IndentConfig, SkipInvalidConfig, ZipConfig } from "../params";
import { SpaceIndex } from "../../core/space-index";
import { SkipInvalid } from "../../core/skip-invalid";
import { FileCreator } from "../file-creator/file-creator";

export type SQLProps = ZipConfig & IndentConfig & SkipInvalidConfig;

export class SQLGenerator extends Generator {
  private readonly zip: boolean;
  private readonly indent: SpaceIndex;
  private readonly skipInvalid: SkipInvalid;

  constructor(
    private readonly utils: ChacaUtils,
    format: ExportSQLFormat,
    config: SQLProps,
  ) {
    super("sql");

    this.zip = Boolean(config.zip);
    this.indent = new SpaceIndex(config.indent);
    this.skipInvalid = new SkipInvalid(config.skipInvalid);
  }

  async createRelationalFile(
    fileCreator: FileCreator,
    resolver: DatasetResolver,
  ): Promise<string[]> {
    const filename = fileCreator.filename;
    const route = fileCreator.generateRoute(filename);

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

    await fileCreator.writeFile(route, code);

    if (this.zip) {
      const zip = fileCreator.createZip();
      zip.add(route);

      return [zip.route];
    } else {
      return [route.value()];
    }
  }

  dumpRelational({ resolver, filename }: DumpRelationalProps): DumpFile[] {
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

    return [{ filename: filename.value(), content: code }];
  }

  dump({ data, filename }: DumpProps): DumpFile[] {
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
      name: filename.value(),
      data: data,
      tables: tables,
      generateIds: true,
    });

    const code = generator.code(tables);

    return [{ content: code, filename: filename.value() }];
  }

  async createFile(fileCreator: FileCreator, data: any): Promise<string[]> {
    const filename = fileCreator.filename;
    const route = fileCreator.generateRoute(filename);

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
      name: filename.value(),
      data: data,
      tables: tables,
      generateIds: true,
    });

    const code = generator.code(tables);

    await fileCreator.writeFile(route, code);

    if (this.zip) {
      const zip = fileCreator.createZip();
      zip.add(route);

      return [zip.route];
    } else {
      return [route.value()];
    }
  }
}
