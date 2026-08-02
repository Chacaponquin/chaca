import { chaca, modules } from "../../../../src";

export const ORDER_SCHEMA = chaca.schema({
  id: chaca.key(() => modules.id.uuid()),
  client_id: chaca.ref("Client.id"),
  employee_id: { type: chaca.ref("Employee.id"), possibleNull: 0.6 },
  order_date: () => {
    const from = new Date();
    from.setMonth(from.getMonth() - 6);

    return modules.date.between({ from, to: new Date() });
  },
  total: () => modules.datatype.float({ precision: 2, max: 1000, min: 10 }),
  status: chaca.enum([
    "pending",
    "on-process",
    "send",
    "delivered",
    "canceled",
  ]),
});
