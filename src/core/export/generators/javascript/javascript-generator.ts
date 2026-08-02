import {
  DumpFile,
  DumpProps,
  DumpRelationalProps,
  Generator,
} from "../generator/generator";
import { Filename } from "../file-creator/filename";
import { JavascriptCodeCreator } from "./core/creator";
import { ChacaUtils } from "../../../utils";
import {
  IndentConfig,
  SeparateConfig,
  SkipInvalidConfig,
  ZipConfig,
} from "../params";
import { SpaceIndex } from "../../core/space-index";
import { SkipInvalid } from "../../core/skip-invalid";
import { DeclarationOnly } from "../../core/declaration-only";

export type JavascriptProps = ZipConfig &
  SeparateConfig &
  IndentConfig &
  SkipInvalidConfig;

export class JavascriptGenerator extends Generator {
  private readonly separate: boolean;

  private readonly creator: JavascriptCodeCreator;

  constructor(utils: ChacaUtils, config: JavascriptProps) {
    super({ ext: "js", zip: config.zip });

    this.separate = Boolean(config.separate);

    this.creator = new JavascriptCodeCreator(
      utils,
      new SpaceIndex(config.indent),
      false,
      new SkipInvalid(config.skipInvalid),
      new DeclarationOnly(false),
    );
  }

  async dumpRelational({
    filename,
    resolver,
  }: DumpRelationalProps): Promise<DumpFile[]> {
    if (this.separate) {
      const result = [] as DumpFile[];

      for (const r of resolver.getResolvers()) {
        const code = this.creator.execute({
          data: await r.resolve(),
          name: r.getSchemaName(),
        });
        const filename = new Filename(r.getSchemaName());

        result.push({ content: code, filename: filename.value() });
      }

      return result;
    } else {
      return this.dump({
        data: await resolver.resolve(),
        filename: filename,
      });
    }
  }

  dump({ filename, data }: DumpProps): DumpFile[] {
    const code = this.creator.execute({
      data: data,
      name: filename.value(),
    });

    return [{ filename: filename.value(), content: code }];
  }
}
