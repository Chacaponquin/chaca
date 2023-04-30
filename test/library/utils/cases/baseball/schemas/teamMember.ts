import { chaca, schemas } from "../../../../../../src";
import { PLAYER_POSITIONS } from "../constants";

export const TEAM_MEMBER_SCHEMA = chaca.defineSchema({
  member_id: chaca.key(schemas.id.uuid()),
  name: schemas.person.fullName({ language: "es" }),
  team_id: chaca.ref("Team.team_id"),
});

export const PLAYER_SCHEMA = chaca.defineSchema({
  team_member_id: chaca.ref("TeamMember.member_id"),
  player_id: chaca.key(schemas.id.uuid()),
  position: {
    enum: PLAYER_POSITIONS,
  },
  player_number: schemas.dataType.int({ min: 1, max: 99 }),
});

export const COACH_SCHEMA = chaca.defineSchema({
  team_member_id: chaca.ref("TeamMember.member_id"),
  experience_year: schemas.dataType.int({ min: 1, max: 15 }),
});

export const PITCHER_SCHEMA = chaca.defineSchema({
  player_id: chaca.ref("Player.player_id"),
  innings_pitched: schemas.dataType.int({ min: 0, max: 1000 }),
  runs_allowed: schemas.dataType.int({ min: 0, max: 500 }),
  pcl: schemas.dataType.number({ min: 0, max: 5 }),
});

export const BATTER_SCHEMA = chaca.defineSchema({
  player_id: chaca.ref("Player.player_id"),
  at_bats: schemas.dataType.int({ min: 0, max: 10000 }),
  total_hits: (fields) => {
    return schemas.dataType.int().getValue({ min: 0, max: fields.at_bats });
  },
});
