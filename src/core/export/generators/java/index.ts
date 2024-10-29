import {
  DumpFile,
  DumpProps,
  DumpRelationalProps,
  Generator,
} from "../generator";
import { DatasetResolver } from "../../../dataset-resolver/resolver";
import { ClassesCreator } from "./core/classes-creator";
import { Filename } from "../file-creator/filename";
import { ValueCreator } from "./core/value-creator";
import { JavaClasses } from "./core/classes";
import { DataValidator } from "./core/validator";
import { JavaCodeCreator } from "./core/code-creator";
import { SpaceIndex } from "../../core/space-index";
import { IndentConfig, SkipInvalidConfig, ZipConfig } from "../params";
import { ChacaUtils } from "../../../utils";
import { SkipInvalid } from "../../core/skip-invalid";
import { Package } from "./value-object/package";
import { FileCreator } from "../file-creator/file-creator";
import { Route } from "../file-creator/route";

export type JavaProps = ZipConfig &
  IndentConfig &
  SkipInvalidConfig & {
    /** Name of the package in which the classes will be found. Default `chaca.data` */
    package?: string;
  };

export class JavaGenerator extends Generator {
  private readonly zip: boolean;
  private readonly creator: JavaCodeCreator;
  private readonly skipInvalid: SkipInvalid;

  constructor(private readonly utils: ChacaUtils, config: JavaProps) {
    super("java");

    this.zip = Boolean(config.zip);

    this.creator = new JavaCodeCreator({
      indent: new SpaceIndex(config.indent),
      package: new Package(config.package),
    });

    this.skipInvalid = new SkipInvalid(config.skipInvalid);
  }

  dumpRelational({ resolver }: DumpRelationalProps): DumpFile[] {
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

    const result = [] as DumpFile[];
    for (const { content, filename: ifilename } of this.creator.execute(
      classes,
    )) {
      const filename = new Filename(ifilename);

      result.push({ content: content, filename: filename.value() });
    }

    return result;
  }

  async createRelationalFile(
    fileCreator: FileCreator,
    resolver: DatasetResolver,
  ): Promise<string[]> {
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
      const route = fileCreator.generateRoute(filename);

      await fileCreator.writeFile(route, content);

      routes.push(route);
    }

    if (this.zip) {
      const zip = fileCreator.createZip();
      await zip.multiple(routes);

      return [zip.route];
    } else {
      return routes.map((r) => r.value());
    }
  }

  dump({ data, filename }: DumpProps): DumpFile[] {
    const classes = new JavaClasses();
    const valueCreator = new ValueCreator(
      this.utils,
      classes,
      this.skipInvalid,
    );
    const validator = new DataValidator();
    const creator = new ClassesCreator(valueCreator, validator);

    creator.execute({
      name: filename.value(),
      data: data,
    });

    const result = [] as DumpFile[];

    for (const { content, filename: ifilename } of this.creator.execute(
      classes,
    )) {
      const filename = new Filename(ifilename);

      result.push({ filename: filename.value(), content: content });
    }

    return result;
  }

  async createFile(fileCreator: FileCreator, data: any): Promise<string[]> {
    const classes = new JavaClasses();
    const valueCreator = new ValueCreator(
      this.utils,
      classes,
      this.skipInvalid,
    );
    const validator = new DataValidator();
    const creator = new ClassesCreator(valueCreator, validator);

    creator.execute({
      name: fileCreator.filename.value(),
      data: data,
    });

    const routes = [] as Route[];
    for (const { content, filename: ifilename } of this.creator.execute(
      classes,
    )) {
      const filename = new Filename(ifilename);
      const route = fileCreator.generateRoute(filename);

      await fileCreator.writeFile(route, content);

      routes.push(route);
    }

    if (this.zip) {
      const zip = fileCreator.createZip();
      await zip.multiple(routes);

      return [zip.route];
    } else {
      return routes.map((r) => r.value());
    }
  }
}
