import { chaca, schemas } from "../../../../../../src";
import { PROVINCES } from "../constants";

export const TEAM_SCHEMA = chaca.defineSchema({
  team_id: chaca.key(schemas.id.uuid()),
  played_championships: schemas.dataType.int({ min: 1, max: 70 }),
  color: () => "#000000",
  name: (fields) => {
    return fields.province + " Team";
  },
  province: chaca.sequential(PROVINCES),
  pet: schemas.animal.animalType(),
  wonChampionships: (fields) => {
    return schemas.dataType
      .int()
      .getValue({ min: 0, max: fields.playedChampionships });
  },
  points: schemas.dataType.int({ min: 0, max: 50 }),
  stadium_id: chaca.ref("Stadium.stadium_id"),
});
