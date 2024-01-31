import { chaca, schemas } from "../../../../../src";

export const MODEL_SCHEMA = chaca.schema({
  id: chaca.key(chaca.sequence()),
  name: schemas.word.conjuction(),
  brand_id: chaca.ref("Brand.id"),
});
