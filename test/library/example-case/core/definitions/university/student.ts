import { chaca, modules } from "../../../../../../src";

export const STUDENT_SCHEMA = chaca.schema({
  id: chaca.key(
    chaca.ref("User.id", {
      unique: true,
      where: ({ refFields }) => {
        return refFields.role === "student";
      },
    }),
  ),
  code: () => chaca.utils.replaceSymbols("######"),
  birthdate: () => modules.date.birthdate({ mode: "age", min: 16 }),
  country: () => modules.address.country(),
  program_id: chaca.ref("Program.id"),
  status: chaca.enum(["active", "suspend", "init", "graduated"]),
  actual_period: async ({ store, currentFields }) => {
    const programs = await store.get("Program");

    const found = programs.find((p) => p.id === currentFields.program_id);

    if (found) {
      return modules.datatype.int({ min: 0, max: found.period_duration });
    }
  },
});
