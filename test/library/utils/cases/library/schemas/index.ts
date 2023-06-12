import { chaca, schemas } from "../../../../../../src";

export const BOOK_TOPIC_SCHEMA = chaca.defineSchema({
  topic: schemas.word.adjective(),
  id: chaca.key(chaca.sequence()),
});

export const BOOK_SCHEMA = chaca.defineSchema({
  id: chaca.key(chaca.sequence()),
  title: schemas.word.noun(),
  edit_year: schemas.dataType.int({ min: 1950, max: new Date().getFullYear() }),
  country: schemas.address.country(),
  resume: schemas.lorem.paragraphs(),
  count_pages: schemas.dataType.int({ min: 50, max: 800 }),
  authors: {
    type: chaca.ref("Author.id"),
    isArray: { min: 1, max: 6 },
  },
});

export const AUTHOR_SCHEMA = chaca.defineSchema({
  id: chaca.key(chaca.sequence()),
  full_name: schemas.person.fullName(),
});

export const USER_SCHEMA = chaca.defineSchema({
  id: chaca.key(chaca.sequence()),
  full_name: schemas.person.fullName(),
});

export const USER_SANCTION_SCHEMA = chaca.defineSchema({
  id: chaca.key(chaca.sequence()),
  user_id: chaca.ref("Library_User.id", {
    where: ({ schemaRestDocuments, refFields: userFields }) => {
      return !schemaRestDocuments
        .getDocuments()
        .some((s) => s.finish_date === null && userFields.id === s.user_id);
    },
  }),
  init_date: schemas.date.past(),
  finish_date: ({ currentFields: fields }) => {
    return chaca.utils.oneOfArray([
      chaca.utils.sumDateRange(fields.init_date, 1, "months"),
      chaca.utils.sumDateRange(fields.init_date, 3, "months"),
      chaca.utils.sumDateRange(fields.init_date, 6, "months"),
      chaca.utils.sumDateRange(fields.init_date, 1, "years"),
      null,
    ]);
  },
});

export const BOOK_LOAN_SCHEMA = chaca.defineSchema({
  id: chaca.key(chaca.sequence()),
  init_date: schemas.date.past(),
  finish_date: ({ currentFields }) => {
    return schemas.date.between().getValue({
      from: currentFields.init_date,
      to: schemas.date.future().getValue(),
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
      return schemas.date
        .between()
        .getValue({ from: currentFields.init_date, to: new Date() });
    },
    posibleNull: 40,
  },
});
