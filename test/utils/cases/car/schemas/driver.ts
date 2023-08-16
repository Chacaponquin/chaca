import { chaca, schemas } from "../../../../../src";

const dni = chaca.schemaField(() => {
  return chaca.utils.replaceSymbols("###########");
});

export const DRIVER_SCHEMA = chaca.schema({
  dni: chaca.key(dni()),
  name: schemas.person.fullName(),
  category: chaca.ref("Category.id"),
  address: schemas.address.cardinalDirection(),
});
