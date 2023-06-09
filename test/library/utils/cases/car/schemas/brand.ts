import { chaca, schemas } from "../../../../../../src";

export const BRAND_SCHEMA = chaca.defineSchema({
  id: chaca.key(chaca.sequence()),
  brand: schemas.word.adjective(),
});
