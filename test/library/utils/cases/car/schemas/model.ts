import { chaca, schemas } from "../../../../../../src";

export const MODEL_SCHEMA = chaca.defineSchema({
  id: chaca.key(schemas.id.uuid()),
  model: schemas.word.conjuction(),
  brand_id: chaca.ref("Brand.id"),
});
