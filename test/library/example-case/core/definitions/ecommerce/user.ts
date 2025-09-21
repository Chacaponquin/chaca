import { chaca, modules } from "../../../../../../src";

export const USER_SCHEMA = chaca.schema({
  id: chaca.key(() => modules.id.uuid()),
  name: () => modules.person.firstName(),
  lastName: () => modules.person.lastName(),
  email: () => modules.internet.email(),
  phone: { type: () => modules.phone.number(), possibleNull: 0.6 },
  role: chaca.probability([
    { value: "client", chance: 0.6 },
    { value: "employee", chance: 0.4 },
    { chance: 0.1, value: "admin" },
  ]),
  createdAt: () => modules.date.past(),
});
