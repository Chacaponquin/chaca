import { chaca, modules } from "../../../../../../../src";

export const CAR_ITEM = chaca.schema({
  cart_id: chaca.key(chaca.ref("Cart.id")),
  product_id: chaca.key(chaca.ref("Product.id")),
  price: () => modules.datatype.float({ precision: 2, min: 0, max: 1000 }),
  quantity: () => modules.datatype.int({ min: 1, max: 10 }),
  created_at: () => modules.date.past(),
});
