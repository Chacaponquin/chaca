import { DatasetResolver } from "../../../dataset-resolver/resolver";
import {
  DumpFile,
  DumpProps,
  DumpRelationalProps,
  Generator,
} from "../generator";
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
import { FileCreator } from "../file-creator/file-creator";
import { Route } from "../file-creator/route";
import { DeclarationOnly } from "../../core/declaration-only";

export type PythonProps = ZipConfig &
  SeparateConfig &
  IndentConfig &
  SkipInvalidConfig &
  DeclarationOnlyConfig;

export class PythonGenerator extends Generator {
  private readonly zip: boolean;
  private readonly separate: boolean;

  private readonly creator: PythonCodeCreator;

  constructor(utils: ChacaUtils, config: PythonProps) {
    super("py");

    this.separate = Boolean(config.separate);
    this.zip = Boolean(config.zip);

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
      const code = this.creator.execute({
        data: resolver.resolve(),
        name: filename.value(),
      });

      return [{ content: code, filename: filename.value() }];
    }
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
      zip.multiple([route]);

      return [zip.route];
    } else {
      return [route.value()];
    }
  }

  async createRelationalFile(
    fileCreator: FileCreator,
    resolver: DatasetResolver,
  ): Promise<string[]> {
    if (this.separate) {
      const allRoutes = [] as Route[];

      for (const r of resolver.getResolvers()) {
        const code = this.creator.execute({
          data: r.resolve(),
          name: r.getSchemaName(),
        });
        const filename = new Filename(r.getSchemaName());
        const route = fileCreator.generateRoute(filename);

        await fileCreator.writeFile(route, code);

        allRoutes.push(route);
      }

      if (this.zip) {
        const zip = fileCreator.createZip();
        await zip.multiple(allRoutes);

        return [zip.route];
      } else {
        return allRoutes.map((r) => r.value());
      }
    } else {
      const filename = fileCreator.filename;
      const route = fileCreator.generateRoute(filename);

      const code = this.creator.execute({
        data: resolver.resolve(),
        name: filename.value(),
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
}
