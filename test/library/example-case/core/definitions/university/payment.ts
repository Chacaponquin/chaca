import { chaca, modules } from "../../../../../../src";

export const PAYMENT_SCHEMA = chaca.schema({
  id: chaca.key(() => modules.id.uuid()),
  method: chaca.enum(["credit-card", "transfer", "cash"]),
  registration_id: chaca.ref("Registration.id", {}),
  status: ({ currentFields, store }) => {
    const exists = store.currentDocuments().filter((r) => {
      return r.registration_id === currentFields.id && r.status !== "failed";
    });

    if (exists.length > 0) {
      return chaca.utils.oneOfArray(["failed"]);
    } else {
      return chaca.utils.oneOfArray(["pending", "completed", "failed"]);
    }
  },
  concept: chaca.enum([
    "registration",
    "extra-course",
    "certificate",
    "library",
  ]),
  amount: async ({ currentFields, store }) => {
    const registrations = await store.get("Registration");
    const courses = await store.get("Course");
    const programs = await store.get("Program");

    const rfound = registrations.find(
      (r) => r.id === currentFields.registration_id,
    );
    const cfound = courses.find((c) => c.id === rfound.course_id);
    const cprogram = programs.find((p) => p.id === cfound.program_id);

    return cprogram.cost;
  },
  created_at: () => modules.date.past(),
});
