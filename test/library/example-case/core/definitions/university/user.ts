import { chaca, modules } from "../../../../../../src";

export const USER_SCHEMA = chaca.schema({
  id: chaca.key(() => modules.id.uuid()),
  name: () => modules.person.firstName(),
  lastname: () => modules.person.lastName(),
  email: () => modules.internet.email(),
  phone: () => modules.phone.number(),
  role: chaca.probability([
    { chance: 0.7, value: "student" },
    { chance: 0.4, value: "teacher" },
    { chance: 0.1, value: "admin" },
  ]),
  created_at: () => modules.date.past(),
});
