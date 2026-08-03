import { chaca, modules } from "../../../../src";

export const SUPPORT_TICKET_SCHEMA = chaca.schema({
  id: chaca.key(() => modules.id.uuid()),
  client_id: chaca.ref("Client.id"),
  employee_id: chaca.ref("Employee.id"),
  order_id: chaca.ref("Order.id"),
  description: () => modules.lorem.paragraphs(),
  title: () => modules.lorem.sentence(),
  status: chaca.enum(["pending", "on-process", "closed"]),
  created_at: async ({ currentFields, store }) => {
    const orders = await store.get("Order");
    const found = orders.find((o) => o.id === currentFields.order_id);

    if (found) {
      return modules.date.between({ from: found.order_date, to: new Date() });
    }

    return modules.date.past();
  },
  close_date: ({ currentFields }) => {
    if (currentFields.status === "closed") {
      return modules.date.between({
        from: currentFields.created_at,
        to: new Date(),
      });
    }

    return null;
  },
});
