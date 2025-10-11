import { chaca, modules } from "../../../../../../src";

export const TEACHER_SCHEMA = chaca.schema({
  id: chaca.key(
    chaca.ref("User.id", {
      unique: true,
      where: ({ refFields }) => {
        return refFields.role === "teacher";
      },
    }),
  ),
  department_id: chaca.ref("Department.id"),
  title: chaca.probability([
    { value: "graduate", chance: 0.7 },
    { value: "mastery", chance: 0.4 },
    { value: "phd", chance: 0.2 },
  ]),
  employment_date: () => modules.date.past(),
  salary: () => modules.datatype.int({ min: 1000, max: 10000 }),
  status: chaca.enum(["active", "licence", "retired"]),
  school_dean_id: {
    type: chaca.ref("School.id", {}),
    possibleNull: ({ currentFields }) => {
      return currentFields.status !== "active";
    },
  },
});
