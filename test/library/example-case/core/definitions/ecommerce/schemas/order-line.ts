import { chaca, modules } from "../../../../../../../src";

export const ORDER_LINE = chaca.schema({
  id: chaca.key(() => modules.id.uuid()),
  order_id: chaca.ref("Order.id"),
  product_id: chaca.ref("Product.id"),
  price: () => modules.datatype.float({ precision: 2, min: 0, max: 1000 }),
  quantity: () => modules.datatype.int({ min: 1, max: 10 }),
});
