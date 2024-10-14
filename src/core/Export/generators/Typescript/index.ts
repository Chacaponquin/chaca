import { Generator } from "../generator";
import { DatasetResolver } from "../../../dataset-resolver/resolver";
import { JavascriptCodeCreator } from "../javascript/core/creator";
import { Filename } from "../generator/name";
import { Route } from "../generator/route";

export interface TypescriptProps {
  zip?: boolean;
  separate?: boolean;
}

export class TypescriptGenerator extends Generator {
  private readonly zip: boolean;
  private readonly separate: boolean;

  private readonly creator: JavascriptCodeCreator;

  constructor(filename: string, location: string, config: TypescriptProps) {
    super({
      extension: "ts",
      filename: filename,
      location: location,
    });

    this.zip = Boolean(config.zip);
    this.separate = Boolean(config.separate);

    this.creator = new JavascriptCodeCreator(this.utils);
  }

  async createFile(data: any): Promise<string[]> {
    const filename = new Filename(this.filename);
    const route = this.generateRoute(filename);

    const code = this.creator.execute({
      data: data,
      name: this.filename,
      types: true,
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
      const routes: Route[] = [];

      for (const r of resolver.getResolvers()) {
        const filename = new Filename(r.getSchemaName());
        const route = this.generateRoute(filename);

        const code = this.creator.execute({
          data: r.resolve(),
          name: r.getSchemaName(),
          types: true,
        });

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
      return this.createFile(resolver.resolve());
    }
  }
}
