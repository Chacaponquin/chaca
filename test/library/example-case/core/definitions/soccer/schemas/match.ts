import { chaca, modules } from "../../../../../../../src";

const TEAM_STATISTICS_SCHEMA = chaca.schema({
  id: chaca.key(chaca.sequence()),
  team_id: ({ currentFields }) => {
    if (currentFields.team_statistics.length === 0) {
      return currentFields.home_team_id;
    } else {
      return currentFields.away_home_team_id;
    }
  },
  possesion: ({ currentFields }) => {
    if (currentFields.team_statistics.length === 0) {
      return modules.datatype.float({ precision: 2, min: 0, max: 1 });
    } else {
      return 1 - currentFields.team_statistics[0].possesion;
    }
  },
  shots: () => modules.datatype.int({ min: 0, max: 20 }),
  shots_on_target: ({ currentFields }) => {
    return modules.datatype.int({ min: 0, max: currentFields.shots });
  },
  corners: () => modules.datatype.int({ min: 0, max: 10 }),
  fouls: () => modules.datatype.int({ min: 0, max: 10 }),
  offsides: () => modules.datatype.int({ min: 0, max: 10 }),
  passes_completed: () => modules.datatype.int({ min: 0, max: 10 }),
});

const PLAYER_STATISTICS_SCHEMA = (team: "home" | "visitant") => {
  return chaca.schema({
    id: chaca.key(chaca.sequence()),
    player_id: chaca.ref("Player.id", {
      where: ({ currentFields, refFields, store }) => {
        const injured = store
          .get("Injury")
          .filter((i) => i.player_id === refFields.id)
          .some((i) => i.end_date > new Date());

        return team === "home"
          ? currentFields.home_team_id === refFields.team_id && !injured
          : currentFields.away_home_team_id === refFields.team_id && !injured;
      },
    }),
    goals: () => {
      return modules.datatype.int({ min: 0, max: 3 });
    },
    assists: () => {
      return modules.datatype.int({ min: 0, max: 3 });
    },
    red_card: chaca.probability([
      { value: false, chance: 0.9 },
      { value: true, chance: 0.1 },
    ]),
    minutes_played: () => modules.datatype.int({ min: 0, max: 100 }),
    shots_on_target: () => modules.datatype.int({ min: 0, max: 8 }),
    passed_completed: () => modules.datatype.int({ min: 1, max: 100 }),
  });
};

export const MATCH_SCHEMA = chaca.schema({
  id: chaca.key(chaca.sequence()),
  date: () => modules.date.past(),
  tournament_id: chaca.ref("Tournament.id"),
  home_team_id: chaca.ref("Team.id"),
  away_home_team_id: chaca.ref("Team.id", {
    where: ({ refFields, currentFields }) => {
      return currentFields.home_team_id !== refFields.id;
    },
  }),
  attendance: () => modules.datatype.int({ min: 5000, max: 100000 }),
  team_statistics: { isArray: 2, type: TEAM_STATISTICS_SCHEMA },
  player_statistics_home: {
    type: PLAYER_STATISTICS_SCHEMA("home"),
    isArray: { min: 11, max: 15 },
  },
  player_statistics_visitant: {
    type: PLAYER_STATISTICS_SCHEMA("visitant"),
    isArray: { min: 11, max: 15 },
  },
});
