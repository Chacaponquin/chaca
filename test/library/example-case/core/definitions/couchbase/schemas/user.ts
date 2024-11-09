import { chaca, modules } from "../../../../../../../src";

export const USER = chaca.schema({
  id: chaca.key(() => modules.id.uuid()),
  email: () => modules.internet.email(),
  phone: () => modules.phone.number(),
  role: chaca.enum(["customer", "admin"]),
  name: () => modules.person.fullName({}),
  avatar: () => modules.image.people(),
  created_at: () => modules.date.past(),
  updated_at: ({ currentFields }) => {
    return modules.date.between({
      from: currentFields.created_at,
      to: new Date(),
    });
  },
  last_login: ({ currentFields }) => {
    return modules.date.between({
      from: currentFields.updated_at,
      to: new Date(),
    });
  },
  email_validated: { type: () => modules.date.past(), possibleNull: 0.4 },
  phone_validated: { type: () => modules.date.past(), possibleNull: 0.8 },
  bio: {
    type: () =>
      modules.lorem.paragraphs({
        paragraphsCount: modules.datatype.int({ min: 1, max: 3 }),
      }),
    possibleNull: 0.6,
  },
  company: { type: () => modules.word.noun(), possibleNull: 0.6 },
});
