import { chaca, modules } from "../../../../../../src";

export const SHIPMENT_SCHEMA = chaca.schema({
  id: chaca.key(() => modules.id.uuid()),
  order_id: chaca.ref("Order.id", { unique: true }),
  send_date: { type: () => modules.date.past(), possibleNull: 0.5 },
  deliver_date: { type: () => modules.date.past(), possibleNull: 0.5 },
  transporter_id: chaca.ref("Transporter.id"),
  deliver_price: () => {
    modules.datatype.float({ precision: 2, min: 1, max: 100 });
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
});
