import { chaca, modules } from "../../../../../../../src";

export const TEAM_SCHEMA = chaca.schema({
  id: chaca.key(chaca.sequence()),
  name: () => modules.lorem.words(),
  stadium: () => modules.lorem.words(),
  foundation_year: () => modules.date.past().getFullYear(),
  champinships_won: () => modules.datatype.int({ min: 0, max: 10 }),
  average: () => modules.datatype.float({ min: 0, max: 1, precision: 4 }),
  budget: () => modules.datatype.float({ min: 10000, max: 100000000 }),
  coach_id: chaca.ref("Coach.id", { unique: true }),
});
