import { describe, expect, it } from "vitest";
import { ExampleCaseTest } from "./core/example-case";
import { UNIVERSITY_DATASET } from "./core/definitions/university/definition";

describe("University case", () => {
  const example = new ExampleCaseTest({
    dataset: UNIVERSITY_DATASET,
    filename: "university",
    location: "university",
    check: (data) => {
      const teachers = data["Teacher"];
      const users = data["User"];
      const students = data["Student"];
      const programs = data["Program"];
      const courses = data["Course"];
      const registrations = data["Registration"];
      const grades = data["Grade"];
      const books = data["Book"];
      const bookLoans = data["BookLoan"];

      describe("grades", () => {
        it("all grades must have only one registration", () => {
          for (const g of grades) {
            const found = registrations.filter(
              (r: { id: string }) => r.id === g.registration_id,
            );

            expect(found).toHaveLength(1);
          }
        });
      });

      describe("registrations", () => {
        it("all active registrtions must have a grade >= 60", () => {
          for (const r of registrations) {
            const grade = grades.find(
              (g: { registration_id: string }) => g.registration_id === r.id,
            );

            expect(grade).toBeDefined();

            if (r.status === "approved") {
              expect(grade.final_grade).toBeGreaterThanOrEqual(60);
              expect(grade.final_grade).toBeLessThanOrEqual(100);
            } else if (r.status === "failed") {
              expect(grade.final_grade).toBeGreaterThanOrEqual(0);
              expect(grade.final_grade).toBeLessThanOrEqual(59);
            } else {
              expect(grade.final_grade).toBeGreaterThanOrEqual(0);
              expect(grade.final_grade).toBeLessThanOrEqual(100);
            }
          }
        });

        it("a student cannot be registered more than once in the same course and period", () => {
          for (const r of registrations) {
            const found = registrations.filter(
              (reg: {
                student_id: string;
                course_id: string;
                period: string;
              }) =>
                reg.student_id === r.student_id &&
                reg.course_id === r.course_id &&
                reg.period === r.period,
            );

            expect(found).toHaveLength(1);
          }
        });
      });

      describe("courses", () => {
        it("all courses must have between 1 and 10 credits", () => {
          for (const c of courses) {
            expect(c.credits).toBeGreaterThanOrEqual(1);
            expect(c.credits).toBeLessThanOrEqual(10);
          }
        });

        it("active courses only can have active teachers", () => {
          for (const c of courses) {
            if (c.active) {
              const teacher = teachers.find(
                (t: { id: string }) => t.id === c.teacher_id,
              );

              expect(teacher).not.toBeUndefined();

              expect(teacher.status).toBe("active");
            }
          }
        });
      });

      describe("book", () => {
        it("all book should have count > 0", () => {
          for (const b of books) {
            expect(b.count).toBeGreaterThanOrEqual(0);
          }
        });
      });

      describe("book loan", () => {
        it("a student can have at most 5 loans", () => {
          for (const s of students) {
            const loans = bookLoans.filter(
              (l: { status: string; student_id: string }) =>
                l.student_id === s.id &&
                (l.status === "loan" || l.status === "late"),
            );

            expect(loans.length).toBeLessThanOrEqual(5);
          }
        });

        it("if book_loan.status = returned, the return_date must be greather than the loan date", () => {
          for (const loan of bookLoans) {
            if (loan.return_date !== null) {
              expect(loan.status).toBe("returned");
              expect(loan.return_date.getTime()).toBeGreaterThan(
                loan.date.getTime(),
              );
            }
          }
        });
      });

      describe("teachers", () => {
        it("teachers.length should be equal that users with role 'teacher'", () => {
          expect(
            users.filter((u: { role: string }) => u.role === "teacher"),
          ).toHaveLength(teachers.length);
        });

        it("all teachers with status != 'active' must have school_dean_id = null", () => {
          for (const t of teachers) {
            if (t.status !== "active") {
              expect(t.school_dean_id).toBeNull();
            } else {
              expect(t.school_dean_id).not.toBeNull();
            }
          }
        });
      });

      describe("programs", () => {
        it("all programs must have period_duration greater than 4", () => {
          for (const p of programs) {
            expect(p.period_duration).toBeGreaterThanOrEqual(4);
          }
        });
      });

      describe("students", () => {
        it("teachers.length should be equal that users with role 'teacher'", () => {
          expect(
            users.filter((u: { role: string }) => u.role === "student"),
          ).toHaveLength(students.length);
        });

        it("all students must have at least 16 years old", () => {
          const calculate = (date: Date): number => {
            const hoy = new Date();
            let edad = hoy.getFullYear() - date.getFullYear();
            const mes = hoy.getMonth() - date.getMonth();

            if (mes < 0 || (mes === 0 && hoy.getDate() < date.getDate())) {
              edad--;
            }

            return edad;
          };

          for (const s of students) {
            const age = calculate(s.birthdate);

            expect(age).toBeGreaterThanOrEqual(16);
          }
        });
      });
    },
  });

  example.execute();
});
