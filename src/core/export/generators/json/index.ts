import { DatasetResolver } from "../../../dataset-resolver/resolver";
import { SpaceIndex } from "../../core/space-index";
import {
  DumpFile,
  DumpProps,
  DumpRelationalProps,
  Generator,
} from "../generator";
import { Filename } from "../file-creator/filename";
import { IndentConfig, SeparateConfig, ZipConfig } from "../params";
import { JsonCodeCreator } from "./core/creator";
import { FileCreator } from "../file-creator/file-creator";
import { Route } from "../file-creator/route";

export type JsonProps = SeparateConfig & ZipConfig & IndentConfig;

export class JsonGenerator extends Generator {
  private readonly config: JsonProps;
  private readonly creator: JsonCodeCreator;

  constructor(props: JsonProps) {
    super("json");

    this.config = props;
    this.creator = new JsonCodeCreator(new SpaceIndex(props.indent));
  }

  dump({ data, filename }: DumpProps): DumpFile[] {
    const code = this.creator.execute(data);

    return [{ filename: filename.value(), content: code }];
  }

  async createFile(fileCreator: FileCreator, data: any): Promise<string[]> {
    const filename = fileCreator.filename;
    const route = fileCreator.generateRoute(filename);
    const code = this.creator.execute(data);
    await fileCreator.writeFile(route, code);

    if (this.config.zip) {
      const zip = fileCreator.createZip();
      await zip.multiple([route]);

      return [zip.route];
    } else {
      return [route.value()];
    }
  }

  async createRelationalFile(
    fileCreator: FileCreator,
    resolver: DatasetResolver,
  ): Promise<string[]> {
    const objectData = resolver.resolve();

    if (this.config.separate) {
      const allRoutes: Route[] = [];

      for (const [key, data] of Object.entries(objectData)) {
        const filename = new Filename(key);
        const route = fileCreator.generateRoute(filename);
        const code = this.creator.execute(data);
        await fileCreator.writeFile(route, code);

        allRoutes.push(route);
      }

      if (this.config.zip) {
        const zip = fileCreator.createZip();

        await zip.multiple(allRoutes);

        return [zip.route];
      } else {
        return allRoutes.map((r) => r.value());
      }
    } else {
      return await this.createFile(fileCreator, objectData);
    }
  }

  dumpRelational({ filename, resolver }: DumpRelationalProps): DumpFile[] {
    const objectData = resolver.resolve();

    if (this.config.separate) {
      const result: DumpFile[] = [];

      for (const [key, data] of Object.entries(objectData)) {
        const filename = new Filename(key);
        const code = this.creator.execute(data);

        result.push({ content: code, filename: filename.value() });
      }

      return result;
    } else {
      return this.dump({ data: resolver.resolve(), filename: filename });
    }
  }
}
