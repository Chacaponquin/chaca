import { DatasetResolver } from "../../../dataset-resolver/dataset-resolver";
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
  zip?: boolean;
}

export abstract class Generator {
  readonly ext: string;
  /**
   * Whether the produced files should be bundled into a single zip when written
   * to disk. It only affects the `FileWriter`; the in-memory `dump` output is
   * never zipped.
   */
  readonly zip: boolean;

  constructor({ ext, zip }: Props) {
    this.ext = ext;
    this.zip = Boolean(zip);
  }

  abstract dump(props: DumpProps): DumpFile[];
  abstract dumpRelational(props: DumpRelationalProps): Promise<DumpFile[]>;
}
