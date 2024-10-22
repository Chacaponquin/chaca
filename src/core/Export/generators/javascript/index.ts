import { Generator } from "../generator";
import { DatasetResolver } from "../../../dataset-resolver/resolver";
import { Filename } from "../generator/name";
import { Route } from "../generator/route";
import { JavascriptCodeCreator } from "./core/creator";
import { ChacaUtils } from "../../../utils";
import { IndentConfig, SeparateConfig, ZipConfig } from "../params";
import { SpaceIndex } from "../../core/space-index";

export type JavascriptProps = ZipConfig & SeparateConfig & IndentConfig;

export class JavascriptGenerator extends Generator {
  private readonly zip: boolean;
  private readonly separate: boolean;

  private readonly creator: JavascriptCodeCreator;

  constructor(
    utils: ChacaUtils,
    filename: string,
    location: string,
    config: JavascriptProps,
  ) {
    super(utils, {
      extension: "js",
      filename: filename,
      location: location,
    });

    this.zip = Boolean(config.zip);
    this.separate = Boolean(config.separate);

    this.creator = new JavascriptCodeCreator(
      this.utils,
      new SpaceIndex(config.indent),
      false,
    );
  }

  async createRelationalFile(resolver: DatasetResolver): Promise<string[]> {
    if (this.separate) {
      const routes = [] as Route[];

      for (const r of resolver.getResolvers()) {
        const code = this.creator.execute({
          data: r.resolve(),
          name: r.getSchemaName(),
        });
        const filename = new Filename(r.getSchemaName());
        const route = this.generateRoute(filename);

        await this.writeFile(route, code);

        routes.push(route);
      }

      if (this.zip) {
        const zip = this.createZip();
        zip.multiple(routes);

        return [zip.route];
      } else {
        return routes.map((r) => r.value());
      }
    } else {
      return await this.createFile(resolver.resolve());
    }
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
}
