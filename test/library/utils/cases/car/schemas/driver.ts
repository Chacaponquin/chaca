import { chaca, schemas } from "../../../../../../src";

export const DRIVER_SCHEMA = chaca.defineSchema({
  dni: chaca.key(schemas.id.uuid()),
  name: schemas.person.fullName(),
  category: chaca.ref("Category.id"),
  address: schemas.address.cardinalDirection(),
});
