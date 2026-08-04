import { chaca, modules } from "../../../../src";

export const MEDICATION_SCHEMA = chaca.schema({
  id: chaca.key(() => modules.id.uuid()),
  code: chaca.sequence({ startsWith: 1000 }),
  name: () => modules.word.noun(),
  unit_price: () => modules.datatype.float({ precision: 2, min: 1, max: 500 }),
  stock: () => modules.datatype.int({ min: 0, max: 1000 }),
});
