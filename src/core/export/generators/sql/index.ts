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
import { RefColumnParser, TablesFixer } from "./core/generators/fixer";
import { ChacaUtils } from "../../../utils";
import {
  DeclarationOnlyConfig,
  IndentConfig,
  SkipInvalidConfig,
  ZipConfig,
} from "../params";
import { SpaceIndex } from "../../core/space-index";
import { SkipInvalid } from "../../core/skip-invalid";
import { FileCreator } from "../file-creator/file-creator";
import { DeclarationOnly } from "../../core/declaration-only";
import { SchemaRouteBuilder } from "./value-object/schema-route";
import { Keys } from "./value-object/keys";
import { Nulls } from "./value-object/nulls";
import { Refs } from "./value-object/refs";
import { Uniques } from "./value-object/uniques";
import { DEFAULT_SCHEMA_NAME } from "../../../schema/core/default-name";
import { GenerateIds } from "./value-object/generate-ids";

export type SQLProps = ZipConfig &
  IndentConfig &
  SkipInvalidConfig &
  DeclarationOnlyConfig & {
    /** columns that will be converted to `PRIMARY KEYS` */
    keys?: string[];
    /** columns that will be converted to `UNIQUE` */
    uniques?: string[];
    /** columns that can accept null values */
    nulls?: string[];
    /** columns that will be converted to `FOREIGN KEYS` */
    refs?: RefColumnParser[];
    /** Generates a sequential id for tables that are created and for which no PRIMARY KEY is defined */
    generateIds?: boolean;
  };

export class SQLGenerator extends Generator {
  private readonly zip: boolean;
  private readonly indent: SpaceIndex;
  private readonly skipInvalid: SkipInvalid;
  private readonly declarationOnly: DeclarationOnly;
  private readonly keys: string[];
  private readonly uniques: string[];
  private readonly nulls: string[];
  private readonly refs: RefColumnParser[];
  private readonly generateIds: GenerateIds;

  constructor(
    private readonly utils: ChacaUtils,
    format: ExportSQLFormat,
    config: SQLProps,
  ) {
    super("sql");

    this.zip = Boolean(config.zip);
    this.indent = new SpaceIndex(config.indent);
    this.skipInvalid = new SkipInvalid(config.skipInvalid);
    this.declarationOnly = new DeclarationOnly(config.declarationOnly);
    this.keys = config.keys ? config.keys : [];
    this.nulls = config.nulls ? config.nulls : [];
    this.refs = config.refs ? config.refs : [];
    this.uniques = config.uniques ? config.uniques : [];
    this.generateIds = new GenerateIds(config.generateIds);
  }

  async createRelationalFile(
    fileCreator: FileCreator,
    resolver: DatasetResolver,
  ): Promise<string[]> {
    const filename = fileCreator.filename;
    const route = fileCreator.generateRoute(filename);
    const routeBuilder = new SchemaRouteBuilder({ include: false });

    const fixer = new TablesFixer(this.utils, {
      keys: [
        ...resolver.getKeyNodes().map((n) => {
          return n.getFieldRoute().string();
        }),
        ...new Keys(routeBuilder, this.keys).value(),
      ],
      nulls: [
        ...resolver.getPossibleNullNodes().map((n) => {
          return n.getFieldRoute().string();
        }),
        ...new Nulls(routeBuilder, this.nulls).value(),
      ],
      refs: [
        ...resolver.getRefsNodes().map((n) => {
          return {
            column: n.getFieldRoute().string(),
            ref: n.getRefFieldRoute().string(),
          };
        }),
        ...new Refs(routeBuilder, this.refs).value(),
      ],
      uniques: new Uniques(routeBuilder, this.uniques).value(),
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
      this.declarationOnly,
      this.generateIds,
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
    const routeBuilder = new SchemaRouteBuilder({ include: false });
    const fixer = new TablesFixer(this.utils, {
      keys: [
        ...resolver.getKeyNodes().map((n) => {
          return n.getFieldRoute().string();
        }),
        ...new Keys(routeBuilder, this.keys).value(),
      ],
      nulls: [
        ...resolver.getPossibleNullNodes().map((n) => {
          return n.getFieldRoute().string();
        }),
        ...new Nulls(routeBuilder, this.nulls).value(),
      ],
      refs: [
        ...resolver.getRefsNodes().map((n) => {
          return {
            column: n.getFieldRoute().string(),
            ref: n.getRefFieldRoute().string(),
          };
        }),
        ...new Refs(routeBuilder, this.refs).value(),
      ],
      uniques: new Uniques(routeBuilder, this.uniques).value(),
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
      this.declarationOnly,
      this.generateIds,
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
    const routeBuilder = new SchemaRouteBuilder({ include: true });
    const fixer = new TablesFixer(this.utils, {
      keys: new Keys(routeBuilder, this.keys).value(),
      nulls: new Nulls(routeBuilder, this.nulls).value(),
      refs: new Refs(routeBuilder, this.refs).value(),
      uniques: new Uniques(routeBuilder, this.uniques).value(),
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
      this.declarationOnly,
      this.generateIds,
    );

    generator.build({
      name: DEFAULT_SCHEMA_NAME,
      data: data,
      tables: tables,
      generateIds: false,
    });

    const code = generator.code(tables);

    return [{ content: code, filename: filename.value() }];
  }

  async createFile(fileCreator: FileCreator, data: any): Promise<string[]> {
    const filename = fileCreator.filename;
    const route = fileCreator.generateRoute(filename);

    const routeBuilder = new SchemaRouteBuilder({ include: true });
    const fixer = new TablesFixer(this.utils, {
      keys: new Keys(routeBuilder, this.keys).value(),
      nulls: new Nulls(routeBuilder, this.nulls).value(),
      refs: new Refs(routeBuilder, this.refs).value(),
      uniques: new Uniques(routeBuilder, this.uniques).value(),
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
      this.declarationOnly,
      this.generateIds,
    );

    generator.build({
      name: DEFAULT_SCHEMA_NAME,
      data: data,
      tables: tables,
      generateIds: false,
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
