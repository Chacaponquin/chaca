import { chaca, modules } from "../../../../../../../src";

export const MATCH_REFEREE_SCHEMA = chaca.schema({
  id: chaca.key(chaca.sequence()),
  referee_id: chaca.ref("Referee.id"),
  match_id: chaca.ref("Match.id", { unique: true }),
  perfomance_rating: () =>
    modules.datatype.float({ min: 0, max: 5, precision: 2 }),
  yellow_card: () => modules.datatype.int({ min: 0, max: 3 }),
  red_card: () => modules.datatype.int({ min: 0, max: 3 }),
  fouls: () => modules.datatype.int({ min: 0, max: 3 }),
  penalties: () => modules.datatype.int({ min: 0, max: 3 }),
  offsites: () => modules.datatype.int({ min: 0, max: 3 }),
});
