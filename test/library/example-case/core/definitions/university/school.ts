import { chaca, modules } from "../../../../../../src";

export const SCHOOL_SCHEMA = chaca.schema({
  id: chaca.key(() => modules.id.uuid()),
  name: () => modules.word.noun(),
});
