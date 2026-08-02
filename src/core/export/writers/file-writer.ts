import { DumpFile } from "../generators/generator/generator";

export interface WriteFilesProps {
  /** Files to persist. Each `filename` must NOT include the extension. */
  files: DumpFile[];
  /** File extension applied to every written file (without the dot). */
  ext: string;
  /** Base output directory. */
  location: string;
  /** Whether the written files must be bundled into a single zip file. */
  zip: boolean;
  /** Base name used for the zip file when `zip` is `true`. */
  filename: string;
}

/**
 * Port that persists already-serialized files somewhere.
 *
 * The core generators only know how to produce `DumpFile[]` (in-memory content).
 * Where those bytes actually land (disk, a zip, a browser download, memory...) is
 * a `FileWriter` concern, so the generation pipeline stays free of any environment
 * specific API (`fs`, `adm-zip`, ...).
 */
export interface FileWriter {
  write(props: WriteFilesProps): Promise<string[]>;
}
