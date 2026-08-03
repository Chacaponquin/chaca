import { chaca, modules } from "../../../../src";

export const COURSE_SCHEMA = chaca.schema({
  id: chaca.key(() => modules.id.uuid()),
  code: () => chaca.utils.replaceSymbols("######"),
  name: () => modules.lorem.words(),
  active: () => modules.datatype.boolean(),
  program_id: chaca.ref("Program.id", {}),
  teacher_id: chaca.ref("Teacher.id", {
    where: ({ refFields, currentFields }) => {
      return currentFields.active ? refFields.status === "active" : true;
    },
  }),
  credits: () => modules.datatype.int({ min: 1, max: 10 }),
});
