import { chaca, modules } from "../../../../src";

export const CREW_MEMBER_SCHEMA = chaca.schema({
  id: chaca.key(() => modules.id.uuid()),
  airline_id: chaca.ref("Airline.id"),
  name: () => modules.person.fullName(),
  role: chaca.probability([
    { value: "attendant", chance: 0.5 },
    { value: "pilot", chance: 0.3 },
    { value: "copilot", chance: 0.2 },
  ]),
  license_number: {
    type: () => chaca.utils.replaceSymbols("LIC-######"),
    possibleNull: ({ currentFields }) => {
      return currentFields.role === "attendant";
    },
  },
  hired_at: () => modules.date.past({ years: 15 }),
});
