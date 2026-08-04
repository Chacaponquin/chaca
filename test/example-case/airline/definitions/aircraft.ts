import { chaca, modules } from "../../../../src";

export const AIRCRAFT_SCHEMA = chaca.schema({
  id: chaca.key(() => modules.id.uuid()),
  airline_id: chaca.ref("Airline.id"),
  model: chaca.enum(["ATR-42", "ATR-72", "CRJ-900", "E-175", "Dash-8"]),
  capacity_economy: () => modules.datatype.int({ min: 6, max: 12 }),
  capacity_business: () => modules.datatype.int({ min: 2, max: 4 }),
  status: chaca.probability([
    { value: "active", chance: 0.8 },
    { value: "maintenance", chance: 0.15 },
    { value: "retired", chance: 0.05 },
  ]),
  manufactured_at: () => modules.date.past({ years: 20 }),
});
