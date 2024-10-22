import { DatasetResolver } from "../../../dataset-resolver/resolver";
import { Generator } from "../generator";
import { Filename } from "../generator/name";
import { YamlCodeCreator } from "./core/creator";
import { Route } from "../generator/route";
import { ChacaUtils } from "../../../utils";
import { IndentConfig, SeparateConfig, ZipConfig } from "../params";
import { SpaceIndex } from "../../core/space-index";

export type YamlProps = {
  /**If `true`, sort keys when dumping YAML. If is a `function`, use the function to sort the keys. Default `false`*/
  sortKeys?: boolean | ((a: any, b: any) => number);

  /**Set max line width. Default `80`*/
  lineWidth?: number;

  /**Strings will be quoted using this quoting style. Default `'` */
  quotingType?: "'" | '"';
} & ZipConfig &
  SeparateConfig &
  IndentConfig;

export class YamlGenerator extends Generator {
  private readonly zip: boolean;
  private readonly separate: boolean;
  private readonly creator: YamlCodeCreator;

  constructor(
    utils: ChacaUtils,
    filename: string,
    location: string,
    config: YamlProps,
  ) {
    super(utils, {
      extension: "yaml",
      filename: filename,
      location: location,
    });

    this.zip = Boolean(config.zip);
    this.separate = Boolean(config.separate);
    this.creator = new YamlCodeCreator({
      indent: new SpaceIndex(config.indent),
      lineWidth: config.lineWidth,
      quotingType: config.quotingType,
      sortKeys: config.sortKeys,
    });
  }

  async createFile(data: any): Promise<string[]> {
    const filename = new Filename(this.filename);
    const route = this.generateRoute(filename);

    const code = this.creator.execute(data);

    await this.writeFile(route, code);

    if (this.zip) {
      const zip = this.createZip();
      zip.add(route);

      return [zip.route];
    } else {
      return [route.value()];
    }
  }

  async createRelationalFile(resolver: DatasetResolver): Promise<string[]> {
    if (this.separate) {
      const routes: Route[] = [];

      for (const r of resolver.getResolvers()) {
        const filename = new Filename(r.getSchemaName());
        const route = this.generateRoute(filename);

        const code = this.creator.execute(r.resolve());

        await this.writeFile(route, code);

        routes.push(route);
      }

      if (this.zip) {
        const zip = this.createZip();

        zip.multiple(routes);

        return [zip.route];
      } else {
        return routes.map((r) => r.value());
      }
    } else {
      return await this.createFile(resolver.resolve());
    }
  }
}
