import { Chaca } from "./Chaca";
import { modules, utils } from "./core-singletons";
import { UnavailableFileWriter } from "./core/export/writers/unavailable/unavailable-file-writer";

export * from "./exports";
export { modules } from "./core-singletons";

/**
 * Browser entry point. It exposes the exact same API as the node entry, but the
 * whole `fs`/`adm-zip` graph is left out: data generation and in-memory
 * serialization (`chaca.transform(...)`) work as usual, while `chaca.export(...)`
 * (which writes to the filesystem) throws a descriptive error.
 */
export const chaca = new Chaca(
  modules.datatype,
  utils,
  new UnavailableFileWriter(),
);
