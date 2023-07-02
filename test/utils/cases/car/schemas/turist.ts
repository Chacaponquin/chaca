import { chaca, schemas } from "../../../../../src";

const passport = chaca.schemaField("passport", () => {
  return chaca.utils.replaceSymbols("???######");
});

export const TURIST_SCHEMA = chaca.schema({
  passport: chaca.key(passport()),
  name: schemas.person.fullName(),
  age: schemas.dataType.int({ min: 15, max: 80 }),
  sex: chaca.enum(["Male", "Woman"]),
  country: chaca.ref("Country.id"),
  contact: schemas.phone.number(),
});
