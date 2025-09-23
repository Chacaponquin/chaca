import { chaca, modules } from "../../../../../../src";

export const GRADE_SCHEMA = chaca.schema({
  id: chaca.key(() => modules.id.uuid()),
  registration_id: chaca.ref("Registration.id"),
  final_grade: () => modules.datatype.float({ precision: 1, min: 0, max: 100 }),
  created_at: () => modules.date.past(),
  status: chaca.enum(["pending", "published", "appealed"]),
});
