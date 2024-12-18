import { chaca } from "../../../../../../src";
import {
  AUTHOR_SCHEMA,
  BOOK_LOAN_SCHEMA,
  BOOK_SCHEMA,
  BOOK_TOPIC_SCHEMA,
  USER_SANCTION_SCHEMA,
  USER_SCHEMA,
} from "./schemas";

export const LIBRARY_DATASET = chaca.dataset([
  { name: "Book_Topic", documents: 10, schema: BOOK_TOPIC_SCHEMA },
  { name: "Book", documents: 20, schema: BOOK_SCHEMA },
  { name: "Author", documents: 30, schema: AUTHOR_SCHEMA },
  { name: "Library_User", documents: 50, schema: USER_SCHEMA },
  { name: "User_Sanction", documents: 10, schema: USER_SANCTION_SCHEMA },
  { name: "Book_Loan", documents: 10, schema: BOOK_LOAN_SCHEMA },
]);
