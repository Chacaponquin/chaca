import { chaca, schemas } from "../../../../../../src";
import {
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
});

export const GROUP_SCHEMA = chaca.defineSchema({
  year_id: chaca.key(chaca.ref("Year.year_id")),
  group_number: chaca.key((ownFields, store) => {
    const allGroupsWithSameYear = store.getValue("Group", {
      where: (fields) => {
        return fields.year_id === ownFields.year_id;
      },
    });

    console.log(allGroupsWithSameYear);

    if (allGroupsWithSameYear.length === 0) {
      return 1;
    } else {
      return (
        allGroupsWithSameYear[allGroupsWithSameYear.length - 1].group_number + 1
      );
    }
  }),
});

export const YEAR_SCHEMA = chaca.defineSchema({
  year_id: chaca.key(chaca.sequence()),
  year_init: chaca.sequential(YEARS_INIT),
  year_finish: chaca.sequential(YEARS_FINISH),
});

export const SUBJECT_SCHEMA = chaca.defineSchema({
  id: chaca.key(chaca.sequence()),
  year_id: chaca.key(chaca.ref("Year.year_id")),
  subject_name: chaca.sequential(SUBJECTS),
  count_hours: schemas.dataType.int({ min: 30, max: 90 }),
});

export const STUDENT_SUBJECT_GRADE = chaca.defineSchema({
  student: chaca.key(chaca.ref("Student.id")),
  subject: chaca.key(chaca.ref("Subject.id")),
  grade: chaca.ref("Grade.id"),
});
