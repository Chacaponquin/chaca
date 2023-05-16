import { chaca, schemas } from "../../../../../../src";

export const TEAM_SCHEMA = chaca.defineSchema({
  team_id: chaca.key(chaca.sequence()),
  played_championships: schemas.dataType.int({ min: 1, max: 70 }),
  color: () => "#000000",
  team_name: (fields, schemasStore) => {
    const provinces = schemasStore.getValue("Province");

    let found = provinces.find((p) => p.province_id === fields.province_id);

    if (found) {
      return found.province_name + " Team";
    }

    return fields.province_id + " Team";
  },
  province_id: chaca.ref("Province.province_id", { unique: true }),
  pet: schemas.animal.animalType(),
  won_championships: (fields) => {
    return schemas.dataType
      .int()
      .getValue({ min: 0, max: fields.played_championships });
  },
  stadium_id: chaca.ref("Stadium.stadium_id", { unique: true }),
});
