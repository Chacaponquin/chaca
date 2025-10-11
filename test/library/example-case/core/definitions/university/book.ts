import { chaca, modules } from "../../../../../../src";

export const BOOK_SCHEMA = chaca.schema({
  id: chaca.key(() => modules.id.uuid()),
  title: () => modules.lorem.words(),
  author: () => modules.person.fullName(),
  count: () => modules.datatype.int({ min: 0, max: 20 }),
});
