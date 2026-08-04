import { chaca, modules } from "../../../../src";

export const PATIENT_SCHEMA = chaca.schema({
  id: chaca.key(() => modules.id.uuid()),
  name: () => modules.person.firstName(),
  lastname: () => modules.person.lastName(),
  birthdate: () => modules.date.birthdate({ mode: "age", min: 0, max: 100 }),
  blood_type: chaca.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]),
  insurance_provider: {
    type: () => modules.word.noun(),
    possibleNull: 0.25,
  },
  email: () => modules.internet.email(),
  phone: () => modules.phone.number(),
});
