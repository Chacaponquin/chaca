import { chaca, modules } from "../../../../src";

export const PAYMENT_SCHEMA = chaca.schema({
  id: chaca.key(() => modules.id.uuid()),
  order_id: chaca.ref("Order.id"),
  pay_date: async ({ currentFields, store }) => {
    const orders = await store.get("Order");
    const found = orders.find((o) => o.id === currentFields.order_id);

    if (found) {
      return modules.date.between({ from: found.order_date, to: new Date() });
    }

    return modules.date.past();
  },
  amount: async ({ store, currentFields }) => {
    const orders = await store.get("Order");
    const found = orders.find((o) => o.id === currentFields.order_id);

    if (found) {
      return found.total;
    }

    return modules.datatype.float({ precision: 2, min: 10, max: 100 });
  },
  payment_method: chaca.enum(["credit-card", "transfer", "paypal", "crypto"]),
  status: async ({ currentFields, store }) => {
    const orders = await store.get("Order");
    const found = orders.find((o) => o.id === currentFields.order_id);

    if (found) {
      if (found.status === "delivered") {
        return "completed";
      } else {
        return chaca.utils.oneOfArray(["pending", "fail"]);
      }
    }

    return chaca.utils.oneOfArray(["pending", "completed", "fail"]);
  },
});
