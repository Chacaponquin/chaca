import { chaca, schemas } from "../../../../../../src";

export const GAME_SCHEMA = chaca.defineSchema({
  home_club: chaca.ref("Team.team_id"),
  visitant: chaca.ref("Team.team_id"),
  game_id: schemas.id.uuid(),
  date: schemas.date.past(),
  winner: (fields) => {
    return chaca.utils.oneOfArray([fields.home_club, fields.visitant]);
  },
  phaseID: chaca.ref("Phase.phase_id"),
});
