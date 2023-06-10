import {
  AUTHOR_SCHEMA,
  BOOK_LOAN_SCHEMA,
  BOOK_SCHEMA,
  BOOK_TOPIC_SCHEMA,
  USER_SANCTION_SCHEMA,
  USER_SCHEMA,
} from "./schemas";

export const LIBRARY_CASE_SCHEMA = [
  { name: "Book_Topic", documents: 30, schema: BOOK_TOPIC_SCHEMA },
  { name: "Book", documents: 550, schema: BOOK_SCHEMA },
  { name: "Author", documents: 100, schema: AUTHOR_SCHEMA },
  { name: "User", documents: 130, schema: USER_SCHEMA },
  { name: "User_Sanction", documents: 100, schema: USER_SANCTION_SCHEMA },
  { name: "Book_Loan", documents: 600, schema: BOOK_LOAN_SCHEMA },
];
