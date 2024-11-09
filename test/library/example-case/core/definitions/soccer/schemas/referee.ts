import { chaca, modules } from "../../../../../../../src";

export const REFEREE_SCHEMA = chaca.schema({
  id: chaca.key(chaca.sequence()),
  salary: () => modules.datatype.float({ min: 10000, max: 2000000 }),
  name: () => modules.person.fullName(),
  country: () => modules.address.country(),
  years_of_experience: () => modules.datatype.int({ min: 1, max: 20 }),
});
