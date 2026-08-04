import { Chaca } from "./Chaca";
import { modules, utils } from "./core-singletons";
import { NodeFileWriter } from "./core/export/writers/node/node-file-writer";

export * from "./exports";
export { modules } from "./core-singletons";

/**
 * Node.js entry point. `chaca.export(...)` writes files to disk through the
 * `NodeFileWriter`. For browser bundles the `browser` export condition resolves
 * to `./browser`, where filesystem writing is disabled.
 */
export const chaca = new Chaca(modules.datatype, utils, new NodeFileWriter());
