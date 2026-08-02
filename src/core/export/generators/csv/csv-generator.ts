import {
  DumpFile,
  DumpProps,
  DumpRelationalProps,
  Generator,
} from "../generator/generator";
import { DataValidator } from "./core/validator";
import { Filename } from "../file-creator/filename";
import { ZipConfig } from "../params";
import { CodeProps, CsvCodeCreator } from "./core/creator";

export type CsvProps = ZipConfig & CodeProps;

export class CsvGenerator extends Generator {
  private readonly creator: CsvCodeCreator;

  constructor({
    zip = false,
    trim = { field: false, header: false },
    delimiter = {},
    excludeKeys = [],
    expandArrayObjects = false,
    expandNestedObjects = true,
    keys,
    parseValue,
    sortHeader = false,
    unwindArrays = false,
  }: CsvProps) {
    super({ ext: "csv", zip: zip });

    this.creator = new CsvCodeCreator(
      {
        trim: trim,
        delimiter: delimiter,
        excludeKeys: excludeKeys,
        expandArrayObjects: expandArrayObjects,
        expandNestedObjects: expandNestedObjects,
        sortHeader: sortHeader,
        unwindArrays: unwindArrays,
        keys: keys,
        parseValue: parseValue,
      },
      new DataValidator(),
    );
  }

  dump({ filename, data }: DumpProps): DumpFile[] {
    const code = this.creator.execute(data);

    return [{ content: code, filename: filename.value() }];
  }

  async dumpRelational({ resolver }: DumpRelationalProps): Promise<DumpFile[]> {
    const result = [] as DumpFile[];

    for (const r of resolver.getResolvers()) {
      const filename = new Filename(r.getSchemaName());
      const code = this.creator.execute(await r.resolve());

      result.push({ filename: filename.value(), content: code });
    }

    return result;
  }
}
