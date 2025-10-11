import { chaca, modules } from "../../../../../../src";

export const SHIPMENT_SCHEMA = chaca.schema({
  id: chaca.key(() => modules.id.uuid()),
  order_id: chaca.ref("Order.id", { unique: true }),
  transporter_id: chaca.ref("Transporter.id"),
  deliver_price: () => {
    return modules.datatype.float({ precision: 2, min: 1, max: 100 });
  },
  status: async ({ store, currentFields }) => {
    const orders = await store.get("Order");
    const found = orders.find((o) => o.id === currentFields.order_id);

    if (found) {
      if (found.status === "delivered") {
        return "delivered";
      }
    }

    return chaca.utils.oneOfArray([
      "pending",
      "in-transit",
      "delivered",
      "returned",
    ]);
  },
  send_date: ({ currentFields }) => {
    if (
      currentFields.status === "delivered" ||
      currentFields.status === "in-transit" ||
      currentFields.status === "returned"
    ) {
      return modules.date.past();
    }

    return null;
  },
  deliver_date: {
    type: ({ currentFields }) => {
      if (
        currentFields.status === "delivered" ||
        currentFields.status === "returned"
      ) {
        return modules.date.between({
          from: currentFields.send_date,
          to: new Date(),
        });
      }

      return null;
    },
  },
});
