import { chaca, modules } from "../../../../src";

export const DOCTOR_SCHEMA = chaca.schema({
  id: chaca.key(() => modules.id.uuid()),
  department_id: chaca.ref("Department.id"),
  license_number: chaca.sequence({ startsWith: 10000 }),
  specialty: chaca.enum([
    "cardiology",
    "neurology",
    "pediatrics",
    "oncology",
    "orthopedics",
    "emergency medicine",
    "radiology",
    "general surgery",
  ]),
  years_experience: () => modules.datatype.int({ min: 0, max: 40 }),
  status: chaca.enum(["active", "on-leave", "retired"]),
});
