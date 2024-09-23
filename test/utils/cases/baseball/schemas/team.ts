import { chaca, modules } from "../../../../../src";

export const TEAM_SCHEMA = chaca.schema({
  team_id: chaca.key(chaca.sequence()),
  played_championships: () => modules.datatype.int({ min: 1, max: 70 }),
  color: () => "#000000",
  team_name: ({ currentFields: fields, store }) => {
    const provinces = store.get("Province");

    let found = provinces.find((p) => p.province_id === fields.province_id);

    if (found) {
      return found.province_name + " Team";
    }

    return fields.province_id + " Team";
  },
  province_id: chaca.ref("Province.province_id", { unique: true }),
  pet: () => modules.animal.type(),
  won_championships: ({ currentFields: fields }) => {
    return modules.datatype.int({ min: 0, max: fields.played_championships });
  },
  stadium_id: chaca.ref("Stadium.stadium_id", { unique: true }),
});
