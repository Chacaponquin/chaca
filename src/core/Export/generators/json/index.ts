import { DatasetResolver } from "../../../dataset-resolver/resolver";
import { Generator } from "../generator";
import { Filename } from "../generator/name";
import { Route } from "../generator/route";

export interface JsonProps {
  separate?: boolean;
  zip?: boolean;
}

interface Props {
  filename: string;
  location: string;
  extConfig: JsonProps;
}

export class JsonGenerator extends Generator {
  private config: JsonProps;

  constructor({ extConfig, filename, location }: Props) {
    super({
      extension: "json",
      filename: filename,
      location: location,
    });

    this.config = extConfig;
  }

  private async setFile(route: Route, content: any): Promise<void> {
    const json = JSON.stringify(content, undefined, 3);
    await this.writeFile(route, json);
  }

  async createFile(data: any): Promise<string[]> {
    const filename = new Filename(this.filename);
    const route = this.generateRoute(filename);
    await this.setFile(route, data);

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
        await this.setFile(route, data);

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
