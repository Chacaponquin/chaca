import { chaca, modules } from "../../../../../../../src";

const SCHEDULE_SCHEMA = chaca.schema({
  day: () => modules.datatype.int({ min: 1, max: 30 }),
  utc: () => {
    return modules.date.past();
  },
  flights: () => chaca.utils.replaceSymbols("#######"),
});

export const ROUTE = chaca.schema({
  id: chaca.key(chaca.sequence()),
  airline_id: chaca.ref("Airline.id"),
  destination_airport_id: chaca.ref("Airport.id"),
  source_airport_id: chaca.ref("Airport.id", {
    where: ({ currentFields, refFields }) => {
      return currentFields.destination_airport_id !== refFields.id;
    },
  }),
  distance: () => modules.datatype.float({ min: 50000, max: 500000 }),
  schedule: { type: SCHEDULE_SCHEMA, isArray: { min: 1, max: 4 } },
});
