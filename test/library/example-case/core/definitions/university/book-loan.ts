import { chaca, modules } from "../../../../../../src";

export const BOOK_LOAN = chaca.schema({
  id: chaca.key(() => modules.id.uuid()),
  student_id: chaca.ref("Student.id"),
  book_id: chaca.ref("Book.id"),
  status: chaca.enum(["loan", "returned", "late"]),
  date: () => modules.date.past(),
  return_date: ({ currentFields }) => {
    if (currentFields.status === "returned") {
      return modules.date.between({ from: currentFields.date, to: new Date() });
    }

    return null;
  },
});
