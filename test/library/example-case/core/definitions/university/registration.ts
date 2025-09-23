import { chaca, modules } from "../../../../../../src";

export const REGISTRATION_SCHEMA = chaca.schema({
  id: chaca.key(() => modules.id.uuid()),
  course_id: chaca.ref("Course.id"),
  period: () => {
    const year = modules.datatype.int({
      min: 2019,
      max: new Date().getFullYear(),
    });

    const int = chaca.utils.oneOfArray([1, 2]);

    return `${year}-${int}`;
  },
  student_id: chaca.ref("Student.id", {
    where: ({ refFields, currentFields, store }) => {
      const documents = store.currentDocuments().filter((d) => {
        return (
          d.student_id === currentFields.student_id &&
          currentFields.period === refFields.period
        );
      });

      return documents.length === 0;
    },
  }),
  registration_date: () => modules.date.past(),
  status: chaca.enum(["active", "retired", "approve", "failed"]),
});
