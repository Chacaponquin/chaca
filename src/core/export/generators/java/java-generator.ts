import {
  DumpFile,
  DumpProps,
  DumpRelationalProps,
  Generator,
} from "../generator/generator";
import { ClassesCreator } from "./core/classes-creator";
import { Filename } from "../file-creator/filename";
import { ValueCreator } from "./core/value-creator";
import { JavaClasses } from "./core/classes";
import { DataValidator } from "./core/validator";
import { JavaCodeCreator } from "./core/code-creator";
import { SpaceIndex } from "../../core/space-index";
import {
  DeclarationOnlyConfig,
  IndentConfig,
  SkipInvalidConfig,
  ZipConfig,
} from "../params";
import { ChacaUtils } from "../../../utils";
import { SkipInvalid } from "../../core/skip-invalid";
import { Package } from "./value-object/package";
import { DeclarationOnly } from "../../core/declaration-only";

export type JavaProps = ZipConfig &
  IndentConfig &
  SkipInvalidConfig &
  DeclarationOnlyConfig & {
    /** Name of the package in which the classes will be found. Default `chaca.data` */
    package?: string;
  };

export class JavaGenerator extends Generator {
  private readonly creator: JavaCodeCreator;
  private readonly skipInvalid: SkipInvalid;

  constructor(
    private readonly utils: ChacaUtils,
    config: JavaProps,
  ) {
    super({ ext: "java", zip: config.zip });

    this.creator = new JavaCodeCreator({
      indent: new SpaceIndex(config.indent),
      package: new Package(config.package),
      declarationOnly: new DeclarationOnly(config.declarationOnly),
    });

    this.skipInvalid = new SkipInvalid(config.skipInvalid);
  }

  async dumpRelational({ resolver }: DumpRelationalProps): Promise<DumpFile[]> {
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
        data: await r.resolve(),
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
}
