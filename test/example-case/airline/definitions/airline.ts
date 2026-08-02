import { chaca, modules } from "../../../../src";

export const AIRLINE_SCHEMA = chaca.schema({
  id: chaca.key(() => modules.id.uuid()),
  name: () => modules.word.noun(),
  code: () => chaca.utils.replaceSymbols("??"),
  founded_at: () => modules.date.past({ years: 50 }),
});
