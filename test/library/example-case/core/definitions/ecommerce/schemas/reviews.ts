import { chaca, modules } from "../../../../../../../src";

export const REVIEW = chaca.schema({
  id: chaca.key(() => modules.id.uuid()),
  product_id: chaca.ref("Product.id"),
  user_id: chaca.ref("User.id"),
  created_at: () => modules.date.past(),
  comment: () =>
    modules.lorem.paragraphs({
      paragraphsCount: modules.datatype.int({ min: 1, max: 3 }),
    }),
  rating: () => modules.datatype.int({ min: 1, max: 5 }),
});
