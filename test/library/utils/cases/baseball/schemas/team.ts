import { chaca, schemas } from "../../../../../../src";

export const TEAM_SCHEMA = chaca.defineSchema({
  team_id: chaca.key(schemas.id.uuid()),
  played_championships: schemas.dataType.int({ min: 1, max: 70 }),
  color: () => "#000000",
  team_name: (fields) => {
    return fields.province + " Team";
  },
  province_id: chaca.ref("Province.province_id", { unique: true }),
  pet: schemas.animal.animalType(),
  wonChampionships: (fields) => {
    return schemas.dataType
      .int()
      .getValue({ min: 0, max: fields.played_championships });
  },
  stadium_id: chaca.ref("Stadium.stadium_id", { unique: true }),
});
