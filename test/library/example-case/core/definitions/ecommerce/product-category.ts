import { chaca, modules } from "../../../../../../src";

export const PRODUCT_CATEGORY_SCHEMA = chaca.schema({
  id: chaca.key(() => modules.id.uuid()),
  name: () => modules.word.noun(),
  description: () => modules.lorem.paragraph(),
});
