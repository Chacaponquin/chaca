import { chaca, modules } from "../../../../../../../src";

const passport = () => {
  return chaca.utils.replaceSymbols("???######");
};

export const TURIST_SCHEMA = chaca.schema({
  passport: chaca.key(passport),
  name: () => modules.person.fullName(),
  age: () => modules.datatype.int({ min: 15, max: 80 }),
  gender: () => modules.datatype.int({ min: 0, max: 2 }),
  country: () => modules.address.country(),
  phone: () => modules.phone.number(),
  email: () => modules.internet.email(),
});
