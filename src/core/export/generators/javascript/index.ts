import {
  DumpFile,
  DumpProps,
  DumpRelationalProps,
  Generator,
} from "../generator";
import { DatasetResolver } from "../../../dataset-resolver/resolver";
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
import { FileCreator } from "../file-creator/file-creator";
import { Route } from "../file-creator/route";
import { DeclarationOnly } from "../../core/declaration-only";

export type JavascriptProps = ZipConfig &
  SeparateConfig &
  IndentConfig &
  SkipInvalidConfig;

export class JavascriptGenerator extends Generator {
  private readonly zip: boolean;
  private readonly separate: boolean;

  private readonly creator: JavascriptCodeCreator;

  constructor(utils: ChacaUtils, config: JavascriptProps) {
    super("js");

    this.zip = Boolean(config.zip);
    this.separate = Boolean(config.separate);

    this.creator = new JavascriptCodeCreator(
      utils,
      new SpaceIndex(config.indent),
      false,
      new SkipInvalid(config.skipInvalid),
      new DeclarationOnly(false),
    );
  }

  dumpRelational({ filename, resolver }: DumpRelationalProps): DumpFile[] {
    if (this.separate) {
      const result = [] as DumpFile[];

      for (const r of resolver.getResolvers()) {
        const code = this.creator.execute({
          data: r.resolve(),
          name: r.getSchemaName(),
        });
        const filename = new Filename(r.getSchemaName());

        result.push({ content: code, filename: filename.value() });
      }

      return result;
    } else {
      return this.dump({
        data: resolver.resolve(),
        filename: filename,
      });
    }
  }

  async createRelationalFile(
    fileCreator: FileCreator,
    resolver: DatasetResolver,
  ): Promise<string[]> {
    if (this.separate) {
      const routes = [] as Route[];

      for (const r of resolver.getResolvers()) {
        const code = this.creator.execute({
          data: r.resolve(),
          name: r.getSchemaName(),
        });
        const filename = new Filename(r.getSchemaName());
        const route = fileCreator.generateRoute(filename);

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

  dump({ filename, data }: DumpProps): DumpFile[] {
    const code = this.creator.execute({
      data: data,
      name: filename.value(),
    });

    return [{ filename: filename.value(), content: code }];
  }

  async createFile(fileCreator: FileCreator, data: any): Promise<string[]> {
    const route = fileCreator.generateRoute(fileCreator.filename);

    const code = this.creator.execute({
      data: data,
      name: fileCreator.filename.value(),
    });

    await fileCreator.writeFile(route, code);

    if (this.zip) {
      const zip = fileCreator.createZip();
      await zip.multiple([route]);

      return [zip.route];
    } else {
      return [route.value()];
    }
  }
}
