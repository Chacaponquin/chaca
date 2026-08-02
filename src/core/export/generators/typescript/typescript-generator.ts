import {
  DumpFile,
  DumpProps,
  DumpRelationalProps,
  Generator,
} from "../generator/generator";
import { JavascriptCodeCreator } from "../javascript/core/creator";
import { Filename } from "../file-creator/filename";
import { ChacaUtils } from "../../../utils";
import {
  DeclarationOnlyConfig,
  IndentConfig,
  SeparateConfig,
  SkipInvalidConfig,
  ZipConfig,
} from "../params";
import { SpaceIndex } from "../../core/space-index";
import { SkipInvalid } from "../../core/skip-invalid";
import { DeclarationOnly } from "../../core/declaration-only";

export type TypescriptProps = ZipConfig &
  SeparateConfig &
  IndentConfig &
  SkipInvalidConfig &
  DeclarationOnlyConfig;

export class TypescriptGenerator extends Generator {
  private readonly separate: boolean;

  private readonly creator: JavascriptCodeCreator;

  constructor(utils: ChacaUtils, config: TypescriptProps) {
    super({ ext: "ts", zip: config.zip });

    this.separate = Boolean(config.separate);

    this.creator = new JavascriptCodeCreator(
      utils,
      new SpaceIndex(config.indent),
      true,
      new SkipInvalid(config.skipInvalid),
      new DeclarationOnly(config.declarationOnly),
    );
  }

  dump({ data, filename }: DumpProps): DumpFile[] {
    const code = this.creator.execute({
      data: data,
      name: filename.value(),
    });

    return [{ content: code, filename: filename.value() }];
  }

  async dumpRelational({
    filename,
    resolver,
  }: DumpRelationalProps): Promise<DumpFile[]> {
    if (this.separate) {
      const result: DumpFile[] = [];

      for (const r of resolver.getResolvers()) {
        const filename = new Filename(r.getSchemaName());

        const code = this.creator.execute({
          data: await r.resolve(),
          name: r.getSchemaName(),
        });

        result.push({ filename: filename.value(), content: code });
      }

      return result;
    } else {
      return this.dump({ data: await resolver.resolve(), filename: filename });
    }
  }
}
