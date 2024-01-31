import { chaca, schemas } from "../../../../../src";

const dni = chaca.schemaField(() => {
  return chaca.utils.replaceSymbols("###########");
});

export const DRIVER_SCHEMA = chaca.schema({
  dni: chaca.key(dni()),
  name: schemas.person.fullName(),
  category: schemas.dataType.int({ min: 0, max: 4 }),
  address: schemas.address.cardinalDirection(),
  email: schemas.internet.email(),
});
