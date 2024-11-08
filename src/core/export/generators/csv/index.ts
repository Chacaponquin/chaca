import {
  DumpFile,
  DumpProps,
  DumpRelationalProps,
  Generator,
} from "../generator";
import { DatasetResolver } from "../../../dataset-resolver/resolver";
import { DataValidator } from "./core/validator";
import { Filename } from "../file-creator/filename";
import { ZipConfig } from "../params";
import { CodeProps, CsvCodeCreator } from "./core/creator";
import { FileCreator } from "../file-creator/file-creator";
import { Route } from "../file-creator/route";

export type CsvProps = ZipConfig & CodeProps;

export class CsvGenerator extends Generator {
  private readonly creator: CsvCodeCreator;

  private readonly zip: boolean;

  constructor({
    zip = false,
    trim = { field: false, header: false },
    delimiter = {},
    excludeKeys = [],
    expandArrayObjects = false,
    expandNestedObjects = true,
    keys,
    parseValue,
    sortHeader = false,
    unwindArrays = false,
  }: CsvProps) {
    super("csv");

    this.creator = new CsvCodeCreator(
      {
        trim: trim,
        delimiter: delimiter,
        excludeKeys: excludeKeys,
        expandArrayObjects: expandArrayObjects,
        expandNestedObjects: expandNestedObjects,
        sortHeader: sortHeader,
        unwindArrays: unwindArrays,
        keys: keys,
        parseValue: parseValue,
      },
      new DataValidator(),
    );

    this.zip = Boolean(zip);
  }

  async createRelationalFile(
    fileCreator: FileCreator,
    resolver: DatasetResolver,
  ): Promise<string[]> {
    const allRoutes = [] as Route[];

    for (const r of resolver.getResolvers()) {
      const filename = new Filename(r.getSchemaName());
      const route = fileCreator.generateRoute(filename);
      const code = this.creator.execute(r.resolve());

      await fileCreator.writeFile(route, code);

      allRoutes.push(route);
    }

    if (this.zip) {
      const zip = fileCreator.createZip();
      await zip.multiple(allRoutes);

      return [zip.route];
    } else {
      return allRoutes.map((r) => r.value());
    }
  }

  dump({ filename, data }: DumpProps): DumpFile[] {
    const code = this.creator.execute(data);

    return [{ content: code, filename: filename.value() }];
  }

  dumpRelational({ resolver }: DumpRelationalProps): DumpFile[] {
    const result = [] as DumpFile[];

    for (const r of resolver.getResolvers()) {
      const filename = new Filename(r.getSchemaName());
      const code = this.creator.execute(r.resolve());

      result.push({ filename: filename.value(), content: code });
    }

    return result;
  }

  async createFile(fileCreator: FileCreator, data: any): Promise<string[]> {
    const code = this.creator.execute(data);
    const route = fileCreator.generateRoute(fileCreator.filename);
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
