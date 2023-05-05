import { chaca, schemas } from "../../../../../../src";

export const TEAM_MEMBER_SCHEMA = chaca.defineSchema({
  member_id: chaca.key(schemas.id.uuid()),
  name: schemas.person.fullName({ language: "es" }),
  team_id: chaca.ref("Team.team_id"),
  member_number: schemas.dataType.int({ min: 1, max: 99 }),
});

export const PLAYER_SCHEMA = chaca.defineSchema({
  team_member_id: chaca.ref("TeamMember.member_id", { unique: true }),
  player_id: chaca.key(schemas.id.uuid()),
  position_id: chaca.ref("Position.position_id"),
});

export const COACH_SCHEMA = chaca.defineSchema({
  team_member_id: chaca.ref("TeamMember.member_id"),
  experience_year: schemas.dataType.int({ min: 1, max: 15 }),
});

export const PITCHER_SCHEMA = chaca.defineSchema({
  player_id: chaca.ref("Player.player_id", {
    unique: true,
    where: (fields, schemas) => {
      let valid = false;

      const allPositions = schemas.getValue("Position");

      for (let i = 0; i < allPositions.length && !valid; i++) {
        if (
          fields.position_id === allPositions[i].position_id &&
          allPositions[i].position_name === "P"
        ) {
          valid = true;
        }
      }

      return valid;
    },
  }),
  innings_pitched: schemas.dataType.int({ min: 0, max: 1000 }),
  runs_allowed: schemas.dataType.int({ min: 0, max: 500 }),
  pcl: schemas.dataType.number({ min: 0, max: 5 }),
});

export const BATTER_SCHEMA = chaca.defineSchema({
  player_id: chaca.ref("Player.player_id", {
    unique: true,
    where: (fields, schemas) => {
      let valid = false;

      const allPositions = schemas.getValue("Position");

      for (let i = 0; i < allPositions.length && !valid; i++) {
        if (
          fields.position_id === allPositions[i].position_id &&
          allPositions[i].position_name !== "P"
        ) {
          valid = true;
        }
      }

      return valid;
    },
  }),
  at_bats: schemas.dataType.int({ min: 0, max: 10000 }),
  total_hits: (fields) => {
    return schemas.dataType.int().getValue({ min: 0, max: fields.at_bats });
  },
});
