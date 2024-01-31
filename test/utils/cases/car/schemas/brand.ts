import { chaca, schemas } from "../../../../../src";

export const BRAND_SCHEMA = chaca.schema({
  id: chaca.key(chaca.sequence()),
  name: schemas.word.adjective(),
});
