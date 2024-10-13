import { Generator } from "../generator";
import { DatasetResolver } from "../../../dataset-resolver/resolver";
import { JavaCodeCreator } from "./core/creator";
import { Filename } from "../generator/name";

export interface JavaProps {
  zip?: boolean;
}

export class JavaGenerator extends Generator {
  private readonly zip: boolean;

  constructor(filename: string, location: string, config: JavaProps) {
    super({
      extension: "java",
      filename: filename,
      location: location,
    });

    this.zip = Boolean(config.zip);
  }

  async createRelationalFile(resolver: DatasetResolver): Promise<string[]> {
    const filename = new Filename(this.filename);
    const route = this.generateRoute(filename);

    const creator = new JavaCodeCreator();
    const code = creator.execute(resolver.resolve());

    await this.writeFile(route, code);

    if (this.zip) {
      const zip = this.createZip();
      zip.add(route);

      return [zip.route];
    } else {
      return [route.value()];
    }
  }

  async createFile(data: any): Promise<string[]> {
    const filename = new Filename(this.filename);
    const route = this.generateRoute(filename);

    const creator = new JavaCodeCreator();
    const code = creator.execute(data);

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
