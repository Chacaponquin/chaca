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
  private readonly validator: DataValidator;
  private readonly creator: CsvCodeCreator;

  private readonly zip: boolean;

  constructor(
    utils: ChacaUtils,
    filename: string,
    location: string,
    {
      zip = false,
      trim = { fields: false, header: false },
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

    this.validator = new DataValidator();
    this.creator = new CsvCodeCreator({
      trim: trim,
      delimiter: delimiter,
      excludeKeys: excludeKeys,
      expandArrayObjects: expandArrayObjects,
      expandNestedObjects: expandNestedObjects,
      sortHeader: sortHeader,
      unwindArrays: unwindArrays,
      keys: keys,
      parseValue: parseValue,
    });

    this.zip = Boolean(zip);
  }

  async createRelationalFile(resolver: DatasetResolver): Promise<string[]> {
    if (this.zip) {
      const allRoutes = [] as Route[];

      for (const r of resolver.getResolvers()) {
        const filename = new Filename(r.getSchemaName());
        const route = await this.setFile(filename, r.resolve());

        allRoutes.push(route);
      }

      const zip = this.createZip();
      zip.multiple(allRoutes);

      return [zip.route];
    } else {
      const filename = new Filename(this.filename);
      const route = await this.setFile(filename, resolver.resolve());

      return [route.value()];
    }
  }

  async createFile(data: any): Promise<string[]> {
    const filename = new Filename(this.filename);
    const code = this.creator.execute(data);
    const route = await this.setFile(filename, code);

    if (this.zip) {
      const zip = this.createZip();
      zip.add(route);

      return [zip.route];
    } else {
      return [route.value()];
    }
  }

  private async setFile(filename: Filename, data: any): Promise<Route> {
    this.validator.execute(data);

    const route = this.generateRoute(filename);
    const content = this.creator.execute(data);

    await this.writeFile(route, content);

    return route;
  }
}
