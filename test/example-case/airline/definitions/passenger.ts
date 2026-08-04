import { chaca, modules } from "../../../../src";

export const PASSENGER_SCHEMA = chaca.schema({
  id: chaca.key(() => modules.id.uuid()),
  name: () => modules.person.firstName(),
  lastname: () => modules.person.lastName(),
  email: () => modules.internet.email(),
  passport: () => chaca.utils.replaceSymbols("P########"),
  birthdate: () => modules.date.birthdate({ mode: "age", min: 18, max: 80 }),
  country: () => modules.address.country(),
  frequent_flyer_number: {
    type: () => chaca.utils.replaceSymbols("FF-########"),
    possibleNull: 0.6,
  },
});
