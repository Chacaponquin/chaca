import { chaca, modules } from "../../../../src";

export const GATE_SCHEMA = chaca.schema({
  id: chaca.key(() => modules.id.uuid()),
  airport_id: chaca.ref("Airport.id"),
  code: () => chaca.utils.replaceSymbols("?##"),
});
