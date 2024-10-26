import { chaca, modules } from "../../../../../../../src";

export const AIRLINE_SCHEMA = chaca.schema({
  id: chaca.key(chaca.sequence()),
  country: () => modules.address.country(),
  name: () => modules.lorem.words(),
});
