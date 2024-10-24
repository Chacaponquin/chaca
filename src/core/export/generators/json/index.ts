import { DatasetResolver } from "../../../dataset-resolver/resolver";
import { ChacaUtils } from "../../../utils";
import { SpaceIndex } from "../../core/space-index";
import { Generator } from "../generator";
import { Filename } from "../generator/name";
import { Route } from "../generator/route";
import { IndentConfig, SeparateConfig, ZipConfig } from "../params";
import { JsonCodeCreator } from "./core/creator";

export type JsonProps = SeparateConfig & ZipConfig & IndentConfig;

interface Props {
  filename: string;
  location: string;
  extConfig: JsonProps;
}

export class JsonGenerator extends Generator {
  private readonly config: JsonProps;
  private readonly creator: JsonCodeCreator;

  constructor(utils: ChacaUtils, { extConfig, filename, location }: Props) {
    super(utils, {
      extension: "json",
      filename: filename,
      location: location,
    });

    this.config = extConfig;
    this.creator = new JsonCodeCreator(new SpaceIndex(extConfig.indent));
  }

  async createFile(data: any): Promise<string[]> {
    const filename = new Filename(this.filename);
    const route = this.generateRoute(filename);
    const code = this.creator.execute(data);
    await this.writeFile(route, code);

    if (this.config.zip) {
      const zip = this.createZip();
      zip.add(route);

      return [zip.route];
    } else {
      return [route.value()];
    }
  }

  async createRelationalFile(resolver: DatasetResolver): Promise<string[]> {
    const objectData = resolver.resolve();

    if (this.config.separate) {
      const allRoutes: Route[] = [];

      for (const [key, data] of Object.entries(objectData)) {
        const filename = new Filename(key);
        const route = this.generateRoute(filename);
        const code = this.creator.execute(data);
        await this.writeFile(route, code);

        allRoutes.push(route);
      }

      if (this.config.zip) {
        const zip = this.createZip();

        await zip.multiple(allRoutes);

        return [zip.route];
      } else {
        return allRoutes.map((r) => r.value());
      }
    } else {
      return await this.createFile(objectData);
    }
  }
}
