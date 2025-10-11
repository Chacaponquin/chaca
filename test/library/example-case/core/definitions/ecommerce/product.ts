import { chaca, modules } from "../../../../../../src";

export const PRODUCT_SCHEMA = chaca.schema({
  id: chaca.key(() => modules.id.uuid()),
  name: () => modules.word.noun(),
  stock: () => modules.datatype.int({ min: 0, max: 10 }),
  cost: () => modules.datatype.float({ precision: 2, min: 1, max: 50 }),
  price: ({ currentFields }) => {
    return modules.datatype.float({
      precision: 2,
      min: currentFields.cost,
      max: currentFields.cost + 50,
    });
  },
  active: () => modules.datatype.boolean(),
  created_at: () => modules.date.past(),
  category_id: chaca.ref("ProductCategory.id"),
});
