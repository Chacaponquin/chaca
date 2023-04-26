import { chaca, schemas } from "../../../../../../src";

export const CATEGORY_SCHEMA = chaca.defineSchema({
  id: chaca.key(schemas.id.uuid()),
  category: schemas.word.adjective(),
});
