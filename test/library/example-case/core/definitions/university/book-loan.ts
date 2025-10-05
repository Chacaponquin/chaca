import { chaca, modules } from "../../../../../../src";

export const BOOK_LOAN = chaca.schema({
  id: chaca.key(() => modules.id.uuid()),
  student_id: chaca.ref("Student.id", {
    where: ({ refFields, store }) => {
      const result = store
        .currentDocuments()
        .filter((s) => s.student_id === refFields.id)
        .filter((s) => s.status === "loan" || s.status === "late");

      return result.length < 5;
    },
  }),
  book_id: chaca.ref("Book.id", {
    where: ({ refFields }) => {
      return refFields.count > 0;
    },
  }),
  status: chaca.enum(["loan", "returned", "late"]),
  date: () => modules.date.past(),
  return_date: ({ currentFields }) => {
    if (currentFields.status === "returned") {
      return modules.date.between({ from: currentFields.date, to: new Date() });
    }

    return null;
  },
});
