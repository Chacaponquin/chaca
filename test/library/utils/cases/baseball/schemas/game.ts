import { chaca, schemas } from "../../../../../../src";

export const GAME_SCHEMA = chaca.schema({
  game_id: chaca.key(chaca.sequence()),
  team_home_club: chaca.ref("Team.team_id"),
  team_visitant: chaca.ref("Team.team_id"),
  winner: ({ currentFields: fields }) => {
    return chaca.utils.oneOfArray([
      fields.team_home_club,
      fields.team_visitant,
    ]);
  },
  runs_home_club: ({ currentFields: fields }) => {
    if (fields.winner === fields.team_home_club) {
      return schemas.dataType.int().getValue({ min: 1, max: 15 });
    } else {
      return schemas.dataType.int().getValue({ min: 0, max: 5 });
    }
  },
  runs_visitant: ({ currentFields: fields }) => {
    if (fields.winner === fields.team_home_club) {
      return schemas.dataType
        .int()
        .getValue({ min: 0, max: fields.runs_home_club });
    } else {
      return schemas.dataType
        .int()
        .getValue({ min: fields.runs_home_club, max: 15 });
    }
  },
  game_date: ({ currentFields: fields, store }) => {
    const phases = store.getValue("Phase");

    const foundPhase = phases.find((p) => p.phase_id === fields.phase_id);

    if (foundPhase) {
      return schemas.date.between().getValue({
        from: foundPhase.start_date,
        to: foundPhase.finish_date,
      });
    }

    return schemas.date.past().getValue();
  },
  phase_id: chaca.ref("Phase.phase_id"),
  total_audience: ({ currentFields: fields, store }) => {
    let foundStadium = null as any;

    const stadiums = store.getValue("Stadium");
    const teams = store.getValue("Team");

    const foundHomeClubTeam = teams.find(
      (t) => t.team_id === fields.team_home_club,
    );

    if (foundHomeClubTeam) {
      foundStadium = stadiums.find(
        (s) => s.stadium_id === foundHomeClubTeam.stadium_id,
      );

      if (foundStadium) {
        return schemas.dataType
          .int()
          .getValue({ min: 50, max: foundStadium.capacity });
      }
    }

    return schemas.dataType.int().getValue({ min: 50, max: 16999 });
  },
});
