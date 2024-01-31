import { chaca, schemas } from "../../../../../src";

const passport = chaca.schemaField(() => {
  return chaca.utils.replaceSymbols("???######");
});

export const TURIST_SCHEMA = chaca.schema({
  passport: chaca.key(passport()),
  name: schemas.person.fullName(),
  age: schemas.dataType.int({ min: 15, max: 80 }),
  gender: schemas.dataType.int({ min: 0, max: 2 }),
  country: schemas.address.country(),
  phone: schemas.phone.number(),
  email: schemas.internet.email(),
});
