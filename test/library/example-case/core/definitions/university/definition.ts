import { chaca } from "../../../../../../src";
import { BOOK_SCHEMA } from "./book";
import { BOOK_LOAN } from "./book-loan";
import { COURSE_SCHEMA } from "./course";
import { DEPARTMENT_SCHEMA } from "./department";
import { GRADE_SCHEMA } from "./grade";
import { PAYMENT_SCHEMA } from "./payment";
import { PROGRAM_SCHEMA } from "./program";
import { REGISTRATION_SCHEMA } from "./registration";
import { SCHOOL_SCHEMA } from "./school";
import { STUDENT_SCHEMA } from "./student";
import { TEACHER_SCHEMA } from "./teacher";
import { USER_SCHEMA } from "./user";

export const UNIVERSITY_DATASET = chaca.dataset([
  { documents: 10, name: "BookLoan", schema: BOOK_LOAN },
  { documents: 10, name: "Book", schema: BOOK_SCHEMA },
  { documents: 10, name: "Course", schema: COURSE_SCHEMA },
  { documents: 10, name: "Department", schema: DEPARTMENT_SCHEMA },
  { documents: 10, name: "Grade", schema: GRADE_SCHEMA },
  { documents: 10, name: "Payment", schema: PAYMENT_SCHEMA },
  { documents: 10, name: "Program", schema: PROGRAM_SCHEMA },
  { documents: 10, name: "Registration", schema: REGISTRATION_SCHEMA },
  { documents: 10, name: "School", schema: SCHOOL_SCHEMA },
  {
    documents: async ({ store }) => {
      const users = await store.get("User");

      return users.filter((u) => u.role === "student").length;
    },
    name: "Student",
    schema: STUDENT_SCHEMA,
  },
  {
    documents: async ({ store }) => {
      const users = await store.get("User");

      return users.filter((u) => u.role === "teacher").length;
    },
    name: "Teacher",
    schema: TEACHER_SCHEMA,
  },
  { documents: 50, name: "User", schema: USER_SCHEMA },
]);
