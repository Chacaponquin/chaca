import { DatasetResolver } from "../../../dataset-resolver/resolver";
import { Generator } from "../generator";
import { PythonCodeCreator } from "./core/creator";
import { Filename } from "../generator/name";
import { Route } from "../generator/route";
import { ChacaUtils } from "../../../utils";
import {
  IndentConfig,
  SeparateConfig,
  SkipInvalidConfig,
  ZipConfig,
} from "../params";
import { SkipInvalid } from "../../core/skip-invalid";
import { SpaceIndex } from "../../core/space-index";

export type PythonProps = ZipConfig &
  SeparateConfig &
  IndentConfig &
  SkipInvalidConfig;

export class PythonGenerator extends Generator {
  private readonly zip: boolean;
  private readonly separate: boolean;

  private readonly creator: PythonCodeCreator;

  constructor(
    utils: ChacaUtils,
    filename: string,
    location: string,
    config: PythonProps,
  ) {
    super(utils, {
      extension: "py",
      filename: filename,
      location: location,
    });

    this.separate = Boolean(config.separate);
    this.zip = Boolean(config.zip);

    this.creator = new PythonCodeCreator(
      utils,
      new SkipInvalid(config.skipInvalid),
      new SpaceIndex(config.indent),
    );
  }

  async createFile(data: any): Promise<string[]> {
    const filename = new Filename(this.filename);
    const route = this.generateRoute(filename);

    const code = this.creator.execute({
      data: data,
      name: this.filename,
    });

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
      const allRoutes = [] as Route[];

      for (const r of resolver.getResolvers()) {
        const code = this.creator.execute({
          data: r.resolve(),
          name: r.getSchemaName(),
        });
        const filename = new Filename(r.getSchemaName());
        const route = this.generateRoute(filename);

        await this.writeFile(route, code);

        allRoutes.push(route);
      }

      if (this.zip) {
        const zip = this.createZip();
        zip.multiple(allRoutes);

        return [zip.route];
      } else {
        return allRoutes.map((r) => r.value());
      }
    } else {
      const filename = new Filename(this.filename);
      const route = this.generateRoute(filename);

      const code = this.creator.execute({
        data: resolver.resolve(),
        name: this.filename,
      });

      await this.writeFile(route, code);

      if (this.zip) {
        const zip = this.createZip();
        zip.add(route);

        return [zip.route];
      } else {
        return [route.value()];
      }
    }
  }
}
