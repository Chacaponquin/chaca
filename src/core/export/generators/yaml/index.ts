import { DatasetResolver } from "../../../dataset-resolver/resolver";
import {
  DumpFile,
  DumpProps,
  DumpRelationalProps,
  Generator,
} from "../generator";
import { Filename } from "../file-creator/filename";
import { YamlCodeCreator } from "./core/creator";
import { IndentConfig, SeparateConfig, ZipConfig } from "../params";
import { SpaceIndex } from "../../core/space-index";
import { FileCreator } from "../file-creator/file-creator";
import { Route } from "../file-creator/route";

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

  constructor(config: YamlProps) {
    super("yaml");

    this.zip = Boolean(config.zip);
    this.separate = Boolean(config.separate);
    this.creator = new YamlCodeCreator({
      indent: new SpaceIndex(config.indent),
      lineWidth: config.lineWidth,
      quotingType: config.quotingType,
      sortKeys: config.sortKeys,
    });
  }

  dump({ data, filename }: DumpProps): DumpFile[] {
    const code = this.creator.execute(data);

    return [{ content: code, filename: filename.value() }];
  }

  async createFile(fileCreator: FileCreator, data: any): Promise<string[]> {
    const filename = fileCreator.filename;
    const route = fileCreator.generateRoute(filename);

    const code = this.creator.execute(data);

    await fileCreator.writeFile(route, code);

    if (this.zip) {
      const zip = fileCreator.createZip();
      await zip.multiple([route]);

      return [zip.route];
    } else {
      return [route.value()];
    }
  }

  dumpRelational({ resolver, filename }: DumpRelationalProps): DumpFile[] {
    if (this.separate) {
      const result: DumpFile[] = [];

      for (const r of resolver.getResolvers()) {
        const filename = new Filename(r.getSchemaName());
        const code = this.creator.execute(r.resolve());

        result.push({ content: code, filename: filename.value() });
      }

      return result;
    } else {
      return this.dump({ data: resolver.resolve(), filename: filename });
    }
  }

  async createRelationalFile(
    fileCreator: FileCreator,
    resolver: DatasetResolver,
  ): Promise<string[]> {
    if (this.separate) {
      const routes: Route[] = [];

      for (const r of resolver.getResolvers()) {
        const filename = new Filename(r.getSchemaName());
        const route = fileCreator.generateRoute(filename);

        const code = this.creator.execute(r.resolve());

        await fileCreator.writeFile(route, code);

        routes.push(route);
      }

      if (this.zip) {
        const zip = fileCreator.createZip();

        await zip.multiple(routes);

        return [zip.route];
      } else {
        return routes.map((r) => r.value());
      }
    } else {
      return await this.createFile(fileCreator, resolver.resolve());
    }
  }
}
