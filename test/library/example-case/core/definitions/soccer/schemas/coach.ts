import { chaca, modules } from "../../../../../../../src";

export const COACH_SCHEMA = chaca.schema({
  id: chaca.key(chaca.sequence()),
  name: () => modules.person.fullName(),
  country: () => modules.address.country(),
  years_of_experience: () => modules.datatype.int({ min: 1, max: 20 }),
  preferred_formation: chaca.enum(["4-3-3", "5-3-2"]),
  contract_end_date: () => modules.date.future(),
  salary: () => modules.datatype.float({ min: 10000, max: 2000000 }),
});
