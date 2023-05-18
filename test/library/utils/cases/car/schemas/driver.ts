import { chaca, schemas } from "../../../../../../src";

const dni = chaca.defineSchemaField("dni", () => {
  return chaca.utils.replaceSymbols("###########");
});

export const DRIVER_SCHEMA = chaca.defineSchema({
  dni: chaca.key(dni()),
  name: schemas.person.fullName(),
  category: chaca.ref("Category.id"),
  address: schemas.address.cardinalDirection(),
});
