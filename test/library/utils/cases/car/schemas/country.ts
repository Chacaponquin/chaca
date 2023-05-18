import { chaca, schemas } from "../../../../../../src";

export const COUNTRY_SCHEMA = chaca.defineSchema({
  id: chaca.key(chaca.sequence()),
  name: schemas.address.country(),
});
