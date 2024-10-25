import { chaca, modules } from "../../../../../src";

export const CATEGORY = chaca.schema({
  id: chaca.key(() => modules.id.uuid()),
  parent_category: {
    type: chaca.ref("Category.id", {
      where: ({ refFields, currentFields }) => {
        return (
          refFields.parent_category !== currentFields.id &&
          refFields.id !== currentFields.id
        );
      },
    }),
    possibleNull: 0.5,
  },
  name: () => modules.word.noun(),
  description: () => {
    return modules.lorem.paragraphs({
      paragraphsCount: modules.datatype.int({ min: 2, max: 4 }),
    });
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
