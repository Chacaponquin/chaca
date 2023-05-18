import { chaca, schemas } from "../../../../../../src";

export const MODEL_SCHEMA = chaca.defineSchema({
  id: chaca.key(chaca.sequence()),
  model: schemas.word.conjuction(),
  brand_id: chaca.key(chaca.ref("Brand.id")),
});
