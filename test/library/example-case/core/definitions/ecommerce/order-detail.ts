import { chaca, modules } from "../../../../../../src";

export const ORDER_DETAIL_SCHEMA = chaca.schema({
  id: chaca.key(() => modules.id.uuid()),
  order_id: chaca.ref("Order.id"),
  product_id: chaca.ref("Product.id", {
    where: async ({ currentFields, store, refFields }) => {
      const orders = await store.get("Order");
      const found = orders.find((o) => o.id === currentFields.order_id);

      const all = store
        .currentDocuments()
        .filter((o) => o.order_id === currentFields.order_id);

      if (found) {
        return (
          found.order_date > refFields.created_at &&
          !all.some((o) => o.product_id === refFields.id)
        );
      }

      return false;
    },
  }),
  count: () => modules.datatype.int({ min: 1, max: 10 }),
  unit_price: async ({ currentFields, store }) => {
    const products = await store.get("Product");
    const found = products.find((p) => p.id === currentFields.product_id);

    if (found) {
      return found.price;
    }

    return modules.datatype.float({ precision: 2, min: 1, max: 100 });
  },
  subtotal: ({ currentFields }) => {
    return currentFields.count * currentFields.unit_price;
  },
});
