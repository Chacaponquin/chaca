import { ChacaError } from "../../../../errors";
import { FileWriter } from "../file-writer";

/**
 * `FileWriter` used in environments without a filesystem (browsers) or when a
 * writer was not injected. Serialization still works through `transform`/`dump`;
 * only writing files to disk is unavailable, so this writer fails loudly with a
 * message that points to the in-memory alternative.
 */
export class UnavailableFileWriter implements FileWriter {
  write(): Promise<string[]> {
    throw new ChacaError(
      "'export' writes files to the filesystem and is not available in this environment. " +
        "Use 'transform' to get the serialized file contents in memory instead.",
    );
  }
}
