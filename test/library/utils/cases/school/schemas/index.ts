import { chaca, schemas } from "../../../../../../src";
import {
  DOWN_REASONS,
  EVALUATIONS,
  MUNICIPALITIES,
  SUBJECTS,
  YEARS_FINISH,
  YEARS_INIT,
} from "../constants";

export const MUNICIPALITY_SCHEMA = chaca.defineSchema({
  name: chaca.sequential(MUNICIPALITIES),
  id: chaca.key(chaca.sequence()),
});

export const GRADE_SCHEMA = chaca.defineSchema({
  grade_name: chaca.sequential(EVALUATIONS),
  id: chaca.key(chaca.sequence()),
});

export const STUDENT_SCHEMA = chaca.defineSchema({
  id: chaca.key(chaca.sequence()),
  student_name: schemas.person.fullName({ language: "es" }),
  sex: { enum: ["Male", "Woman"] },
  municipality_id: chaca.ref("Municipality.id"),
  group: chaca.ref("Group.group_number"),
  year: chaca.ref("Group.year", {
    where: ({ currentFields, refFields }) => {
      return currentFields.group === refFields.group_number;
    },
  }),
});

export const GROUP_SCHEMA = chaca.defineSchema({
  year: chaca.key(chaca.ref("Year.year_id")),
  group_number: chaca.key(
    ({ currentFields: ownFields, schemaRestDocuments }) => {
      const allGroupsWithSameYear = schemaRestDocuments
        .getDocuments()
        .filter((g) => g.year === ownFields.year);

      if (allGroupsWithSameYear.length === 0) {
        return 1;
      } else {
        return (
          allGroupsWithSameYear[allGroupsWithSameYear.length - 1].group_number +
          1
        );
      }
    },
  ),
});

export const YEAR_SCHEMA = chaca.defineSchema({
  year_id: chaca.key(chaca.sequence()),
  year_init: chaca.sequential(YEARS_INIT),
  year_finish: chaca.sequential(YEARS_FINISH),
});

export const SUBJECT_SCHEMA = chaca.defineSchema({
  id: chaca.key(chaca.sequence()),
  year: chaca.key(chaca.ref("Year.year_id")),
  subject_name: chaca.sequential(SUBJECTS),
  count_hours: schemas.dataType.int({ min: 30, max: 90 }),
});

export const DOWN_REASON_SCHEMA = chaca.defineSchema({
  id: chaca.key(chaca.sequence()),
  name: chaca.sequential(DOWN_REASONS),
});

export const DOWN_STUDENTS_SCHEMA = chaca.defineSchema({
  reason_id: chaca.key(chaca.ref("Down_Reason.id")),
  student_id: chaca.key(chaca.ref("Student.id")),
});

export const STUDENT_SUBJECT_GRADE = chaca.defineSchema({
  subject_id: chaca.key(chaca.ref("Subject.id")),
  student: chaca.key(
    chaca.ref("Student.id", {
      where: ({ currentFields, refFields: studentFields, store }) => {
        const foundSubject = store.getValue("Subject", {
          where(fields) {
            return fields.id === currentFields.subject_id;
          },
        });

        return studentFields.year === foundSubject[0].year;
      },
    }),
  ),
  grade: chaca.ref("Grade.id"),
});
