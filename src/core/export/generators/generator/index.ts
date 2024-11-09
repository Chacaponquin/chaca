import { DatasetResolver } from "../../../dataset-resolver/resolver";
import { FileCreator } from "../file-creator/file-creator";
import { Filename } from "../file-creator/filename";

export interface DumpFile {
  filename: string;
  content: string;
}

export interface DumpProps {
  filename: Filename;
  data: any;
}

export interface DumpRelationalProps {
  resolver: DatasetResolver;
  filename: Filename;
}

export abstract class Generator {
  constructor(readonly ext: string) {}

  abstract createFile(fileCreator: FileCreator, data: any): Promise<string[]>;
  abstract createRelationalFile(
    fileCreator: FileCreator,
    resolver: DatasetResolver,
  ): Promise<string[]>;
  abstract dump(props: DumpProps): DumpFile[];
  abstract dumpRelational(props: DumpRelationalProps): DumpFile[];
}
