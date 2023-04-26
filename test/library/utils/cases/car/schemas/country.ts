import { chaca, schemas } from "../../../../../../src";

export const COUNTRY_SCHEMA = chaca.defineSchema({
  id: chaca.key(schemas.id.uuid()),
  country: schemas.address.country(),
});
