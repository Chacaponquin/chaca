import { chaca, modules } from "../../../../src";

export const EMPLOYEE_SCHEMA = chaca.schema({
  id: chaca.key(
    chaca.ref("User.id", {
      unique: true,
      where: ({ refFields }) => {
        return refFields.role === "employee";
      },
    }),
  ),
  department: chaca.enum(["sells", "support", "logistic", "finance"]),
  charge: () => modules.word.noun(),
  salary: () => modules.datatype.float({ precision: 2, min: 1000, max: 6000 }),
  initDate: () => modules.date.past(),
});
