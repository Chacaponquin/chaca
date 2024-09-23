import { chaca, modules } from "../../../../../src";
import { TOTAL_COACHS, TOTAL_PLAYERS } from "../constants";

const ARRAY_PLAYERS = new Array(TOTAL_PLAYERS).fill(0).map(() => "P");
const ARRAY_COACHS = new Array(TOTAL_COACHS).fill(0).map(() => "C");

export const TEAM_MEMBER_SCHEMA = chaca.schema({
  member_id: chaca.key(chaca.sequence()),
  member_name: () => modules.person.fullName({ language: "es", sex: "male" }),
  team_id: chaca.ref("Team.team_id"),
  member_number: () => modules.datatype.int({ min: 1, max: 99 }),
  years_in_team: () => modules.datatype.int({ min: 1, max: 20 }),
  member_type: chaca.sequential([...ARRAY_PLAYERS, ...ARRAY_COACHS]),
  /*teams_record: {
    type: chaca.schema({
      team_id: chaca.ref("Team.team_id"),
      year_init: chaca.sequence({
        starsWith: modules.datatype.int({
          min: 2010,
          max: new Date().getFullYear(),
        }),
      }),
      year_finish: {
        possibleNull: 50,
        type: () => {
          return modules.datatype
            .int()
            .value({ min: 2010, max: new Date().getFullYear() });
        },
      },
    }),
    isArray: { min: 1, max: 3 },
  },*/
});

export const PLAYER_SCHEMA = chaca.schema({
  member_id: chaca.key(
    chaca.ref("TeamMember.member_id", {
      unique: true,
      where: ({ refFields }) => {
        return refFields.member_type === "P";
      },
    }),
  ),
  position_id: chaca.ref("Position.position_id"),
});

export const COACH_SCHEMA = chaca.schema({
  member_id: chaca.key(
    chaca.ref("TeamMember.member_id", {
      unique: true,
      where: ({ refFields }) => {
        return refFields.member_type === "C";
      },
    }),
  ),
  experience_year: () => modules.datatype.int({ min: 1, max: 15 }),
});

export const PITCHER_SCHEMA = chaca.schema({
  member_id: chaca.key(
    chaca.ref("Player.member_id", {
      unique: true,
      where: ({ refFields, store }) => {
        let valid = false;

        const allPositions = store.get("Position");

        for (let i = 0; i < allPositions.length && !valid; i++) {
          if (
            refFields.position_id === allPositions[i].position_id &&
            allPositions[i].position_name === "P"
          ) {
            valid = true;
          }
        }

        return valid;
      },
    }),
  ),
  innings_pitched: () => modules.datatype.int({ min: 0, max: 1000 }),
  runs_allowed: () => modules.datatype.int({ min: 0, max: 1000 }),
});

export const BATTER_SCHEMA = chaca.schema({
  member_id: chaca.key(
    chaca.ref("Player.member_id", {
      unique: true,
      where: ({ refFields, store }) => {
        let valid = false;

        const allPositions = store.get("Position");

        for (let i = 0; i < allPositions.length && !valid; i++) {
          if (
            refFields.position_id === allPositions[i].position_id &&
            allPositions[i].position_name !== "P"
          ) {
            valid = true;
          }
        }

        return valid;
      },
    }),
  ),
  at_bats: () => modules.datatype.int({ min: 0, max: 10000 }),
  total_hits: ({ currentFields: fields }) => {
    return modules.datatype.int({ min: 0, max: fields.at_bats });
  },
});
