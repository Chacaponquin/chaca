import { DatasetResolver } from "../../../dataset-resolver/dataset-resolver";
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

interface Props {
  ext: string;
}

export abstract class Generator {
  readonly ext: string;

  constructor({ ext }: Props) {
    this.ext = ext;
  }

  abstract createFile(fileCreator: FileCreator, data: any): Promise<string[]>;
  abstract createRelationalFile(
    fileCreator: FileCreator,
    resolver: DatasetResolver,
  ): Promise<string[]>;
  abstract dump(props: DumpProps): DumpFile[];
  abstract dumpRelational(props: DumpRelationalProps): Promise<DumpFile[]>;
}
