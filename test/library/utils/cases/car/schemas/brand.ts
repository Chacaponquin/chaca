import { chaca, schemas } from "../../../../../../src";

export const BRAND_SCHEMA = chaca.defineSchema({
  id: chaca.key(schemas.id.uuid()),
  brand: schemas.word.adjective(),
});
