import { Generator } from "../generator";
import { DatasetResolver } from "../../../dataset-resolver/resolver";
import { DataValidator } from "./core/validator";
import { Route } from "../generator/route";
import { Filename } from "../generator/name";
import { ChacaUtils } from "../../../utils";
import { ZipConfig } from "../params";
import { CodeProps, CsvCodeCreator } from "./core/creator";

export type CsvProps = ZipConfig & CodeProps;

export class CsvGenerator extends Generator {
  private readonly creator: CsvCodeCreator;

  private readonly zip: boolean;

  constructor(
    utils: ChacaUtils,
    filename: string,
    location: string,
    {
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
    }: CsvProps,
  ) {
    super(utils, {
      extension: "csv",
      filename: filename,
      location: location,
    });

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

  async createRelationalFile(resolver: DatasetResolver): Promise<string[]> {
    const allRoutes = [] as Route[];

    for (const r of resolver.getResolvers()) {
      const filename = new Filename(r.getSchemaName());
      const route = this.generateRoute(filename);
      const code = this.creator.execute(r.resolve());

      await this.writeFile(route, code);

      allRoutes.push(route);
    }

    if (this.zip) {
      const zip = this.createZip();
      zip.multiple(allRoutes);

      return [zip.route];
    } else {
      return allRoutes.map((r) => r.value());
    }
  }

  async createFile(data: any): Promise<string[]> {
    const filename = new Filename(this.filename);
    const code = this.creator.execute(data);
    const route = this.generateRoute(filename);
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
