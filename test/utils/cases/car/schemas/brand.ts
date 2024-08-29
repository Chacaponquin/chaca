import { chaca, modules } from "../../../../../src";

export const BRAND_SCHEMA = chaca.schema({
  id: chaca.key(chaca.sequence()),
  name: modules.word.adjective(),
});
