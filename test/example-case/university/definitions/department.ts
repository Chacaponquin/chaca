import { chaca, modules } from "../../../../src";

export const DEPARTMENT_SCHEMA = chaca.schema({
  id: chaca.key(() => modules.id.uuid()),
  name: () => modules.word.noun(),
  school_id: chaca.ref("School.id"),
});
