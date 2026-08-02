import { SpaceIndex } from "../../core/space-index";
import {
  DumpFile,
  DumpProps,
  DumpRelationalProps,
  Generator,
} from "../generator/generator";
import { Filename } from "../file-creator/filename";
import { IndentConfig, SeparateConfig, ZipConfig } from "../params";
import { JsonCodeCreator } from "./core/creator";

export type JsonProps = SeparateConfig & ZipConfig & IndentConfig;

export class JsonGenerator extends Generator {
  private readonly config: JsonProps;
  private readonly creator: JsonCodeCreator;

  constructor(props: JsonProps) {
    super({ ext: "json", zip: props.zip });

    this.config = props;
    this.creator = new JsonCodeCreator(new SpaceIndex(props.indent));
  }

  dump({ data, filename }: DumpProps): DumpFile[] {
    const code = this.creator.execute(data);

    return [{ filename: filename.value(), content: code }];
  }

  async dumpRelational({
    filename,
    resolver,
  }: DumpRelationalProps): Promise<DumpFile[]> {
    const objectData = await resolver.resolve();

    if (this.config.separate) {
      const result: DumpFile[] = [];

      for (const [key, data] of Object.entries(objectData)) {
        const filename = new Filename(key);
        const code = this.creator.execute(data);

        result.push({ content: code, filename: filename.value() });
      }

      return result;
    } else {
      return this.dump({ data: objectData, filename: filename });
    }
  }
}
