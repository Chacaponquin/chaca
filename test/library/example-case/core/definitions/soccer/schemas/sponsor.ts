import { chaca, modules } from "../../../../../../../src";

export const SPONSOR_SCHEMA = chaca.schema({
  id: chaca.key(chaca.sequence()),
  name: () => modules.lorem.words(),
  contact_person: () => modules.person.fullName(),
  total_investiment: () => modules.datatype.float({ min: 10000, max: 500000 }),
});
