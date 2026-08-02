import {
  DumpFile,
  DumpProps,
  DumpRelationalProps,
  Generator,
} from "../generator/generator";
import { PythonCodeCreator } from "./core/creator";
import { Filename } from "../file-creator/filename";
import { ChacaUtils } from "../../../utils";
import {
  DeclarationOnlyConfig,
  IndentConfig,
  SeparateConfig,
  SkipInvalidConfig,
  ZipConfig,
} from "../params";
import { SkipInvalid } from "../../core/skip-invalid";
import { SpaceIndex } from "../../core/space-index";
import { DeclarationOnly } from "../../core/declaration-only";

export type PythonProps = ZipConfig &
  SeparateConfig &
  IndentConfig &
  SkipInvalidConfig &
  DeclarationOnlyConfig;

export class PythonGenerator extends Generator {
  private readonly separate: boolean;

  private readonly creator: PythonCodeCreator;

  constructor(utils: ChacaUtils, config: PythonProps) {
    super({ ext: "py", zip: config.zip });

    this.separate = Boolean(config.separate);

    this.creator = new PythonCodeCreator(
      utils,
      new SkipInvalid(config.skipInvalid),
      new SpaceIndex(config.indent),
      new DeclarationOnly(config.declarationOnly),
    );
  }

  dump({ filename, data }: DumpProps): DumpFile[] {
    const code = this.creator.execute({
      data: data,
      name: filename.value(),
    });

    return [{ filename: filename.value(), content: code }];
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
      const code = this.creator.execute({
        data: await resolver.resolve(),
        name: filename.value(),
      });

      return [{ content: code, filename: filename.value() }];
    }
  }
}
