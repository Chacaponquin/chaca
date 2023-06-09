import { chaca, schemas } from "../../../../../../src";

export const BOOK_TOPIC = chaca.defineSchema({
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
  loan_id: chaca.key(chaca.ref("Book_Loan")),
  init_date: schemas.date.past(),
  finish_date: {
    type: (fields) => {
      return chaca.utils.oneOfArray([
        chaca.utils.sumDateRange(fields.init_date, 1, "months"),
        chaca.utils.sumDateRange(fields.init_date, 3, "months"),
        chaca.utils.sumDateRange(fields.init_date, 6, "months"),
        chaca.utils.sumDateRange(fields.init_date, 1, "years"),
      ]);
    },
    posibleNull: 50,
  },
});

export const BOOK_LOAN = chaca.defineSchema({
  init_date: schemas.date.past(),
  finish_date: (fields) => {
    return schemas.date.between().getValue({
      from: fields.init_date,
      to: schemas.date.future().getValue(),
    });
  },
  book_id: chaca.ref("Book.id"),
  user_id: chaca.ref("User.id"),
  deliver_date: {
    type: (fields) => {
      return schemas.date
        .between()
        .getValue({ from: fields.init_date, to: new Date() });
    },
    posibleNull: 40,
  },
  id: chaca.key(chaca.sequence()),
});
