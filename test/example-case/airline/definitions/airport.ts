import { chaca, modules } from "../../../../src";

export const AIRPORT_SCHEMA = chaca.schema({
  id: chaca.key(() => modules.id.uuid()),
  code: () => chaca.utils.replaceSymbols("???"),
  name: () => modules.word.noun(),
  city: () => modules.word.noun(),
  country: () => modules.address.country(),
});
