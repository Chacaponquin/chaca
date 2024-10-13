import { DatasetResolver } from "../../../dataset-resolver/resolver";
import { Generator } from "../generator";
import { Filename } from "../generator/name";
import { YamlCodeCreator } from "./core/creator";
import { Route } from "../generator/route";

export interface YamlProps {
  zip?: boolean;
  separate?: boolean;
}

export class YamlGenerator extends Generator {
  private readonly zip: boolean;
  private readonly separate: boolean;

  private readonly creator = new YamlCodeCreator();

  constructor(filename: string, location: string, config: YamlProps) {
    super({
      extension: "yaml",
      filename: filename,
      location: location,
    });

    this.zip = Boolean(config.zip);
    this.separate = Boolean(config.separate);
  }

  async createFile(data: any): Promise<string[]> {
    const filename = new Filename(this.filename);
    const route = this.generateRoute(filename);

    const code = this.creator.execute(data);

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
      const routes: Route[] = [];

      for (const r of resolver.getResolvers()) {
        const filename = new Filename(r.getSchemaName());
        const route = this.generateRoute(filename);

        const code = this.creator.execute(r.resolve());

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
}
