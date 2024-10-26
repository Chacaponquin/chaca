import { chaca, modules } from "../../../../../../../src";

export const MODEL_SCHEMA = chaca.schema({
  id: chaca.key(chaca.sequence()),
  name: () => modules.word.conjuction(),
  brand_id: chaca.ref("Brand.id"),
});
