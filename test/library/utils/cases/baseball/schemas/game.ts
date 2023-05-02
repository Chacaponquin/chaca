import { chaca, schemas } from "../../../../../../src";

export const GAME_SCHEMA = chaca.defineSchema({
  home_club: chaca.ref("Team.team_id"),
  visitant: chaca.ref("Team.team_id"),
  game_id: schemas.id.uuid(),
  date: schemas.date.past(),
  winner: (fields) => {
    return chaca.utils.oneOfArray([fields.home_club, fields.visitant]);
  },
  phase_id: chaca.ref("Phase.phase_id"),
  total_audience: schemas.dataType.int({ min: 50, max: 16999 }),
});
