import {
  DumpFile,
  DumpProps,
  DumpRelationalProps,
  Generator,
} from "../generator/generator";
import { Filename } from "../file-creator/filename";
import { YamlCodeCreator } from "./core/creator";
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
  private readonly separate: boolean;
  private readonly creator: YamlCodeCreator;

  constructor(config: YamlProps) {
    super({ ext: "yaml", zip: config.zip });

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

  async dumpRelational({
    resolver,
    filename,
  }: DumpRelationalProps): Promise<DumpFile[]> {
    if (this.separate) {
      const result: DumpFile[] = [];

      for (const r of resolver.getResolvers()) {
        const filename = new Filename(r.getSchemaName());
        const code = this.creator.execute(await r.resolve());

        result.push({ content: code, filename: filename.value() });
      }

      return result;
    } else {
      return this.dump({ data: await resolver.resolve(), filename: filename });
    }
  }
}
