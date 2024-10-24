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
import { IndentConfig, SkipInvalidConfig, ZipConfig } from "../params";
import { ChacaUtils } from "../../../utils";
import { SkipInvalid } from "../../core/skip-invalid";
import { Package } from "./value-object/package";

export type JavaProps = ZipConfig &
  IndentConfig &
  SkipInvalidConfig & {
    /**Name of the package in which the classes will be found. Default `chaca.data` */
    package?: string;
  };

export class JavaGenerator extends Generator {
  private readonly zip: boolean;
  private readonly creator: JavaCodeCreator;
  private readonly skipInvalid: SkipInvalid;

  constructor(
    utils: ChacaUtils,
    filename: string,
    location: string,
    config: JavaProps,
  ) {
    super(utils, {
      extension: "java",
      filename: filename,
      location: location,
    });

    this.zip = Boolean(config.zip);

    this.creator = new JavaCodeCreator({
      indent: new SpaceIndex(config.indent),
      package: new Package(config.package),
    });

    this.skipInvalid = new SkipInvalid(config.skipInvalid);
  }

  async createRelationalFile(resolver: DatasetResolver): Promise<string[]> {
    const classes = new JavaClasses();
    const valueCreator = new ValueCreator(
      this.utils,
      classes,
      this.skipInvalid,
    );
    const validator = new DataValidator();
    const creator = new ClassesCreator(valueCreator, validator);

    for (const r of resolver.getResolvers()) {
      creator.execute({
        name: r.getSchemaName(),
        data: r.resolve(),
      });
    }

    const routes = [] as Route[];
    for (const { content, filename: ifilename } of this.creator.execute(
      classes,
    )) {
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
    const valueCreator = new ValueCreator(
      this.utils,
      classes,
      this.skipInvalid,
    );
    const validator = new DataValidator();
    const creator = new ClassesCreator(valueCreator, validator);

    creator.execute({
      name: this.filename,
      data: data,
    });

    const routes = [] as Route[];
    for (const { content, filename: ifilename } of this.creator.execute(
      classes,
    )) {
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
