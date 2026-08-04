import { chaca, modules } from "../../../../src";

export const ROOM_SCHEMA = chaca.schema({
  id: chaca.key(() => modules.id.uuid()),
  department_id: chaca.ref("Department.id"),
  room_number: chaca.sequence({ startsWith: 100 }),
  capacity: () => modules.datatype.int({ min: 1, max: 4 }),
});
