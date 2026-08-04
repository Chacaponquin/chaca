import { chaca, modules } from "../../../../src";

export const MEMBERSHIP_SCHEMA = chaca.schema({
  id: chaca.key(
    chaca.ref("Passenger.id", {
      unique: true,
      where: ({ refFields }) => {
        return refFields.frequent_flyer_number !== null;
      },
    }),
  ),
  tier: chaca.probability([
    { value: "bronze", chance: 0.6 },
    { value: "silver", chance: 0.25 },
    { value: "gold", chance: 0.1 },
    { value: "platinum", chance: 0.05 },
  ]),
  points: () => modules.datatype.int({ min: 0, max: 100000 }),
  since: () => modules.date.past({ years: 10 }),
});
