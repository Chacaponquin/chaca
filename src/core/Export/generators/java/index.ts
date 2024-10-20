import { Generator } from "../generator";
import { DatasetResolver } from "../../../dataset-resolver/resolver";
import { ClassesCreator } from "./core/classes-creator";
import { Filename } from "../generator/name";
import { ValueCreator } from "./core/value-creator";
import { JavaClasses } from "./core/classes";
import { DataValidator } from "./core/validator";
import { JavaCodeCreator } from "./core/code-creator";
import { SpaceIndex } from "../../core/space-index";
import { Route } from "../generator/route";

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
    const classes = new JavaClasses();
    const index = new SpaceIndex(3);
    const valueCreator = new ValueCreator(this.utils, classes);
    const validator = new DataValidator();
    const creator = new ClassesCreator(valueCreator, validator);
    const codeCreator = new JavaCodeCreator(classes, index);

    for (const r of resolver.getResolvers()) {
      creator.execute({
        name: r.getSchemaName(),
        data: r.resolve(),
      });
    }

    const routes = [] as Route[];
    for (const { content, filename: ifilename } of codeCreator.execute()) {
      const filename = new Filename(ifilename);
      const route = this.generateRoute(filename);

      await this.writeFile(route, content);

      routes.push(route);
    }

    if (this.zip) {
      const zip = this.createZip();
      await zip.multiple(routes);

      return [zip.route];
    } else {
      return routes.map((r) => r.value());
    }
  }

  async createFile(data: any): Promise<string[]> {
    const classes = new JavaClasses();
    const index = new SpaceIndex(3);
    const valueCreator = new ValueCreator(this.utils, classes);
    const validator = new DataValidator();
    const creator = new ClassesCreator(valueCreator, validator);
    const codeCreator = new JavaCodeCreator(classes, index);

    creator.execute({
      name: this.filename,
      data: data,
    });

    const routes = [] as Route[];
    for (const { content, filename: ifilename } of codeCreator.execute()) {
      const filename = new Filename(ifilename);
      const route = this.generateRoute(filename);

      await this.writeFile(route, content);

      routes.push(route);
    }

    if (this.zip) {
      const zip = this.createZip();
      await zip.multiple(routes);

      return [zip.route];
    } else {
      return routes.map((r) => r.value());
    }
  }
}
