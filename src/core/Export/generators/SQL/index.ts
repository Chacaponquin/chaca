import { ExportSQLFormat } from "../../interfaces/export";
import { Generator } from "../generator";
import { SQLTable } from "./core/table";
import {
  InputTreeNode,
  KeyValueNode,
  RefValueNode,
} from "../../../input-tree/core";
import { SQLDataGenerator } from "./core/generators/postgres";
import { DatasetResolver } from "../../../dataset-resolver/resolver";
import { Filename } from "../generator/name";

export interface SQLProps {
  zip?: boolean;
}

export class SQLGenerator extends Generator {
  private schemasPrimaryKeys: KeyValueNode[] = [];
  private schemasForeignKeys: RefValueNode[] = [];
  private schemaspossibleNull: InputTreeNode[] = [];
  private allTables: SQLTable[] = [];
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

    this.generator = new SQLDataGenerator(format, this.allTables);

    this.zip = Boolean(config.zip);
  }

  async createRelationalFile(resolvers: DatasetResolver): Promise<string[]> {
    resolvers.getResolvers().forEach((r) => {
      const allKeys = r.getKeyNodes();
      allKeys.forEach((k) => this.schemasPrimaryKeys.push(k));

      const allRefs = r.getRefNodes();
      allRefs.forEach((r) => this.schemasForeignKeys.push(r));

      const allpossibleNull = r.getPossibleNullNodes();
      allpossibleNull.forEach((n) => this.schemaspossibleNull.push(n));
    });

    const filename = new Filename(this.filename);
    const route = this.generateRoute(filename);

    await this.writeFile(route, this.generator.code());

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
    const code = this.generator.code();

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
