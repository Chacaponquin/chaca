import {
  DumpFile,
  DumpProps,
  DumpRelationalProps,
  Generator,
} from "../generator";
import { DatasetResolver } from "../../../dataset-resolver/resolver";
import { JavascriptCodeCreator } from "../javascript/core/creator";
import { Filename } from "../file-creator/filename";
import { ChacaUtils } from "../../../utils";
import {
  IndentConfig,
  SeparateConfig,
  SkipInvalidConfig,
  ZipConfig,
} from "../params";
import { SpaceIndex } from "../../core/space-index";
import { SkipInvalid } from "../../core/skip-invalid";
import { FileCreator } from "../file-creator/file-creator";
import { Route } from "../file-creator/route";

export type TypescriptProps = ZipConfig &
  SeparateConfig &
  IndentConfig &
  SkipInvalidConfig;

export class TypescriptGenerator extends Generator {
  private readonly zip: boolean;
  private readonly separate: boolean;

  private readonly creator: JavascriptCodeCreator;

  constructor(utils: ChacaUtils, config: TypescriptProps) {
    super("ts");

    this.zip = Boolean(config.zip);
    this.separate = Boolean(config.separate);

    this.creator = new JavascriptCodeCreator(
      utils,
      new SpaceIndex(config.indent),
      true,
      new SkipInvalid(config.skipInvalid),
    );
  }

  dump({ data, filename }: DumpProps): DumpFile[] {
    const code = this.creator.execute({
      data: data,
      name: filename.value(),
    });

    return [{ content: code, filename: filename.value() }];
  }

  async createFile(fileCreator: FileCreator, data: any): Promise<string[]> {
    const filename = fileCreator.filename;
    const route = fileCreator.generateRoute(filename);

    const code = this.creator.execute({
      data: data,
      name: filename.value(),
    });

    await fileCreator.writeFile(route, code);

    if (this.zip) {
      const zip = fileCreator.createZip();
      zip.add(route);

      return [zip.route];
    } else {
      return [route.value()];
    }
  }

  dumpRelational({ filename, resolver }: DumpRelationalProps): DumpFile[] {
    if (this.separate) {
      const result: DumpFile[] = [];

      for (const r of resolver.getResolvers()) {
        const filename = new Filename(r.getSchemaName());

        const code = this.creator.execute({
          data: r.resolve(),
          name: r.getSchemaName(),
        });

        result.push({ filename: filename.value(), content: code });
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

        const code = this.creator.execute({
          data: r.resolve(),
          name: r.getSchemaName(),
        });

        await fileCreator.writeFile(route, code);

        routes.push(route);
      }

      if (this.zip) {
        const zip = fileCreator.createZip();
        zip.multiple(routes);

        return [zip.route];
      } else {
        return routes.map((r) => r.value());
      }
    } else {
      return this.createFile(fileCreator, resolver.resolve());
    }
  }
}
