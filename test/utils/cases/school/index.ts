import {
  DOWN_REASONS,
  EVALUATIONS,
  MUNICIPALITIES,
  SUBJECTS,
  YEARS_INIT,
} from "./constants";
import {
  DOWN_REASON_SCHEMA,
  DOWN_STUDENTS_SCHEMA,
  GRADE_SCHEMA,
  GROUP_SCHEMA,
  MUNICIPALITY_SCHEMA,
  STUDENT_SCHEMA,
  STUDENT_SUBJECT_GRADE,
  SUBJECT_SCHEMA,
  YEAR_SCHEMA,
} from "./schemas";

export const SCHOOL_SCHEMAS = [
  {
    name: "Municipality",
    documents: MUNICIPALITIES.length,
    schema: MUNICIPALITY_SCHEMA,
  },
  { name: "Group", documents: 40, schema: GROUP_SCHEMA },
  { name: "Grade", documents: EVALUATIONS.length, schema: GRADE_SCHEMA },
  { name: "Student", documents: 600, schema: STUDENT_SCHEMA },
  { name: "Year", documents: YEARS_INIT.length, schema: YEAR_SCHEMA },
  { name: "Subject", documents: SUBJECTS.length, schema: SUBJECT_SCHEMA },
  {
    name: "Subject_Student",
    documents: 100,
    schema: STUDENT_SUBJECT_GRADE,
  },
  {
    name: "Down_Reason",
    documents: DOWN_REASONS.length,
    schema: DOWN_REASON_SCHEMA,
  },
  {
    name: "Down_Student",
    documents: 60,
    schema: DOWN_STUDENTS_SCHEMA,
  },
];
