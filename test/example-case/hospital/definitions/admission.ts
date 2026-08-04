import { chaca, modules } from "../../../../src";

export const ADMISSION_SCHEMA = chaca.schema({
  id: chaca.key(() => modules.id.uuid()),
  patient_id: chaca.ref("Patient.id", {
    where: ({ refFields, store }) => {
      const activeAdmissions = store
        .currentDocuments()
        .filter(
          (a) => a.patient_id === refFields.id && a.discharge_date === null,
        );

      return activeAdmissions.length === 0;
    },
  }),
  department_id: chaca.ref("Department.id"),
  admission_date: () => modules.date.past({ years: 2 }),
  discharge_date: {
    type: ({ currentFields }) =>
      modules.date.between({
        from: currentFields.admission_date,
        to: new Date(),
      }),
    possibleNull: 0.2,
  },
  reason: () => modules.lorem.words(),
});
