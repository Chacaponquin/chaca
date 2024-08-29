import { chaca, modules } from "../../../../../src";

export const BOOK_TOPIC_SCHEMA = chaca.schema({
  topic: modules.word.adjective(),
  id: chaca.key(chaca.sequence()),
});

export const BOOK_SCHEMA = chaca.schema({
  id: chaca.key(chaca.sequence()),
  title: modules.word.noun(),
  edit_year: modules.datatype.int({ min: 1950, max: new Date().getFullYear() }),
  country: modules.address.country(),
  resume: modules.lorem.paragraphs(),
  count_pages: modules.datatype.int({ min: 50, max: 800 }),
  authors: {
    type: chaca.ref("Author.id"),
    isArray: { min: 1, max: 6 },
  },
});

export const AUTHOR_SCHEMA = chaca.schema({
  id: chaca.key(chaca.sequence()),
  full_name: modules.person.fullName(),
});

export const USER_SCHEMA = chaca.schema({
  id: chaca.key(chaca.sequence()),
  full_name: modules.person.fullName(),
});

export const USER_SANCTION_SCHEMA = chaca.schema({
  id: chaca.key(chaca.sequence()),
  user_id: chaca.ref("Library_User.id", {
    where: ({ refFields: userFields, store }) => {
      return !store
        .getValue("User_Sanction")
        .some((s) => s.finish_date === null && userFields.id === s.user_id);
    },
  }),
  init_date: modules.date.past(),
  finish_date: ({ currentFields: fields }) => {
    return chaca.utils.oneOfArray([
      chaca.utils.sumDateRange({
        date: fields.init_date,
        value: 1,
        range: "months",
      }),
      chaca.utils.sumDateRange({
        date: fields.init_date,
        value: 3,
        range: "months",
      }),
      chaca.utils.sumDateRange({
        date: fields.init_date,
        value: 6,
        range: "months",
      }),
      chaca.utils.sumDateRange({
        date: fields.init_date,
        value: 1,
        range: "years",
      }),
      null,
    ]);
  },
});

export const BOOK_LOAN_SCHEMA = chaca.schema({
  id: chaca.key(chaca.sequence()),
  init_date: modules.date.past(),
  finish_date: ({ currentFields }) => {
    return modules.date.between().getValue({
      from: currentFields.init_date,
      to: modules.date.future().getValue(),
    });
  },
  book_id: chaca.ref("Book.id"),
  user_id: chaca.ref("Library_User.id", {
    where: ({ store, currentFields }) => {
      const findSanctionsThatUser = store.getValue("User_Sanction", {
        where: (sanctionFields) => {
          return sanctionFields.user_id === currentFields.user_id;
        },
      });

      if (findSanctionsThatUser.length) {
        return !findSanctionsThatUser.some((s) => {
          if (s.finish_date !== null) {
            return (
              s.init_date.getTime() < currentFields.init_date.getTime() &&
              currentFields.init_date.getTime() < s.finish_date
            );
          } else {
            return true;
          }
        });
      } else {
        return true;
      }
    },
  }),
  deliver_date: {
    type: ({ currentFields }) => {
      return modules.date
        .between()
        .getValue({ from: currentFields.init_date, to: new Date() });
    },
    possibleNull: 40,
  },
});
