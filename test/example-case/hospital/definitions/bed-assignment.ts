import { chaca, modules } from "../../../../src";

export const BED_ASSIGNMENT_SCHEMA = chaca.schema({
  id: chaca.key(() => modules.id.uuid()),
  admission_id: chaca.ref("Admission.id", { unique: true }),
  room_id: chaca.ref("Room.id", {
    where: async ({ refFields, store }) => {
      const admissions = await store.get("Admission");

      const activeCount = store
        .currentDocuments()
        .filter((b) => b.room_id === refFields.id)
        .filter((b) => {
          const linked = admissions.find((a) => a.id === b.admission_id);

          return linked && linked.discharge_date === null;
        }).length;

      return activeCount < refFields.capacity;
    },
  }),
  assigned_date: async ({ currentFields, store }) => {
    const admissions = await store.get("Admission");
    const admission = admissions.find(
      (a) => a.id === currentFields.admission_id,
    );

    return admission.admission_date;
  },
});
