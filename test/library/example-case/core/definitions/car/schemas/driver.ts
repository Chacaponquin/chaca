import { chaca, modules } from "../../../../../../../src";

const dni = () => {
  return chaca.utils.replaceSymbols("###########");
};

export const DRIVER_SCHEMA = chaca.schema({
  dni: chaca.key(dni),
  name: () => modules.person.fullName(),
  category: () => modules.datatype.int({ min: 0, max: 4 }),
  address: () => modules.address.cardinalDirection(),
  email: () => modules.internet.email(),
});
