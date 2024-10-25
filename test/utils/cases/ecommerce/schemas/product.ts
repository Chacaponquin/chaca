import { chaca, modules } from "../../../../../src";

export const PRODUCT = chaca.schema({
  id: chaca.key(() => modules.id.uuid()),
  title: () => modules.lorem.words(),
  category_id: chaca.ref("Category.id"),
  picture: () => modules.image.event(),
  summary: () => modules.lorem.paragraphs({ paragraphsCount: 1 }),
  description: () =>
    modules.lorem.paragraphs({
      paragraphsCount: modules.datatype.int({ min: 3, max: 5 }),
    }),
  price: () => modules.datatype.float({ precision: 2, min: 0, max: 1000 }),
  discount_type: chaca.enum(["none", "percent", "amount"]),
  discount_value: ({ currentFields }) => {
    if (currentFields.discount_type === "none") {
      return 0;
    }

    return modules.datatype.float({ precision: 2, min: 0, max: 5 });
  },
  tags: {
    type: () => modules.word.noun({ language: "es" }),
    isArray: { min: 3, max: 9 },
  },
  created_at: () => modules.date.past(),
  updated_at: ({ currentFields }) => {
    return modules.date.future({ refDate: currentFields.created_at });
  },
});
