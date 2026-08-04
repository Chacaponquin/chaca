import { chaca, modules } from "../../../../src";

export const DEPARTMENT_SCHEMA = chaca.schema({
  id: chaca.key(() => modules.id.uuid()),
  name: chaca.enum([
    "Cardiology",
    "Neurology",
    "Pediatrics",
    "Oncology",
    "Orthopedics",
    "Emergency Medicine",
    "Radiology",
    "General Surgery",
  ]),
  floor: () => modules.datatype.int({ min: 1, max: 10 }),
  daily_rate: () =>
    modules.datatype.float({ precision: 2, min: 100, max: 1000 }),
});
