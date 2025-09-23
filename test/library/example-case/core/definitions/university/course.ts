import { chaca, modules } from "../../../../../../src";

export const COURSE_SCHEMA = chaca.schema({
  id: chaca.key(() => modules.id.uuid()),
  code: () => chaca.utils.replaceSymbols("######"),
  name: () => modules.lorem.words(),
  program_id: chaca.ref("Program.id", {
    where: ({ refFields }) => {
      return refFields.active === true;
    },
  }),
  credits: () => modules.datatype.int({ min: 1, max: 10 }),
  teacher_id: chaca.ref("Teacher.id", {
    where: ({ refFields }) => {
      return refFields.status === "active";
    },
  }),
  active: () => modules.datatype.boolean(),
});
