import { chaca, schemas } from "../../../../../../src";

export const GAME_SCHEMA = chaca.defineSchema({
  game_id: chaca.key(schemas.id.uuid()),
  team_home_club: chaca.ref("Team.team_id"),
  team_visitant: chaca.ref("Team.team_id"),
  date: (fields, schemasStore) => {
    const phases = schemasStore.getValue("Phase");

    const foundPhase = phases.find((p) => p.phase_id === fields.phase_id);

    if (foundPhase) {
      return schemas.date.between().getValue({
        from: foundPhase.start_date,
        to: foundPhase.finish_date,
      });
    }

    return schemas.date.past().getValue();
  },
  winner: (fields) => {
    return chaca.utils.oneOfArray([
      fields.team_home_club,
      fields.team_visitant,
    ]);
  },
  phase_id: chaca.ref("Phase.phase_id"),
  total_audience: (fields, schemaStore) => {
    let foundStadium = null as any;

    const stadiums = schemaStore.getValue("Stadium");
    const teams = schemaStore.getValue("Team");

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
