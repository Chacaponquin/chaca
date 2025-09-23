import { chaca, modules } from "../../../../../../src";

export const PAYMENT_SCHEMA = chaca.schema({
  id: chaca.key(() => modules.id.uuid()),
  student_id: chaca.ref("Student.id"),
  concept: chaca.enum([
    "registration",
    "extra-course",
    "certificate",
    "library",
  ]),
  amount: () => modules.datatype.float({ precision: 2, min: 1, max: 1000 }),
  created_at: () => modules.date.past(),
  method: chaca.enum(["credit-card", "transfer", "cash"]),
  status: chaca.enum(["pending", "completed", "failed"]),
});
