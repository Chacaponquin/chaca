import { describe, expect, it } from "vitest";
import { ExampleCaseTest } from "../core/example-case";
import { HOSPITAL_DATASET } from "./definitions/definition";

describe("Hospital case", () => {
  const example = new ExampleCaseTest({
    dataset: HOSPITAL_DATASET,
    check: (data) => {
      const departments = data["Department"];
      const doctors = data["Doctor"];
      const patients = data["Patient"];
      const rooms = data["Room"];
      const admissions = data["Admission"];
      const bedAssignments = data["BedAssignment"];
      const appointments = data["Appointment"];
      const medications = data["Medication"];
      const prescriptions = data["Prescription"];
      const invoices = data["Invoice"];

      describe("doctors", () => {
        it("years_experience must be between 0 and 40", () => {
          for (const d of doctors) {
            expect(d.years_experience).toBeGreaterThanOrEqual(0);
            expect(d.years_experience).toBeLessThanOrEqual(40);
          }
        });

        it("license_number must be unique and sequential starting at 10000", () => {
          const numbers = doctors.map(
            (d: { license_number: number }) => d.license_number,
          );

          expect(new Set(numbers).size).toBe(numbers.length);
          expect(Math.min(...numbers)).toBe(10000);
        });
      });

      describe("admissions", () => {
        it("a patient cannot have more than one simultaneous active admission", () => {
          const activeByPatient = new Map<string, number>();

          for (const a of admissions) {
            if (a.discharge_date === null) {
              const key = a.patient_id;
              activeByPatient.set(key, (activeByPatient.get(key) ?? 0) + 1);
            }
          }

          for (const count of activeByPatient.values()) {
            expect(count).toBeLessThanOrEqual(1);
          }
        });

        it("discharge_date, when present, must be after admission_date", () => {
          for (const a of admissions) {
            if (a.discharge_date !== null) {
              expect(a.discharge_date.getTime()).toBeGreaterThanOrEqual(
                a.admission_date.getTime(),
              );
            }
          }
        });

        it("some admissions are still active and some are discharged", () => {
          const active = admissions.filter(
            (a: { discharge_date: Date | null }) => a.discharge_date === null,
          );
          const discharged = admissions.filter(
            (a: { discharge_date: Date | null }) => a.discharge_date !== null,
          );

          expect(active.length).toBeGreaterThan(0);
          expect(discharged.length).toBeGreaterThan(0);
        });
      });

      describe("bed assignments", () => {
        it("every admission has exactly one bed assignment", () => {
          for (const a of admissions) {
            const found = bedAssignments.filter(
              (b: { admission_id: string }) => b.admission_id === a.id,
            );

            expect(found).toHaveLength(1);
          }
        });

        it("active bed assignments in a room never exceed the room's capacity", () => {
          for (const room of rooms) {
            const activeCount = bedAssignments.filter(
              (b: { room_id: string; admission_id: string }) => {
                if (b.room_id !== room.id) return false;

                const admission = admissions.find(
                  (a: { id: string }) => a.id === b.admission_id,
                );

                return admission && admission.discharge_date === null;
              },
            ).length;

            expect(activeCount).toBeLessThanOrEqual(room.capacity);
          }
        });

        it("assigned_date must match the linked admission's admission_date", () => {
          for (const b of bedAssignments) {
            const admission = admissions.find(
              (a: { id: string }) => a.id === b.admission_id,
            );

            expect(b.assigned_date.getTime()).toBe(
              admission.admission_date.getTime(),
            );
          }
        });
      });

      describe("appointments", () => {
        it("only active doctors can have appointments assigned to them", () => {
          for (const ap of appointments) {
            const doctor = doctors.find(
              (d: { id: string }) => d.id === ap.doctor_id,
            );

            expect(doctor).not.toBeUndefined();
            expect(doctor.status).toBe("active");
          }
        });

        it("appointments scheduled in the future can only be 'scheduled' or 'cancelled'", () => {
          const now = Date.now();

          for (const ap of appointments) {
            if (ap.scheduled_date.getTime() > now) {
              expect(["scheduled", "cancelled"]).toContain(ap.status);
            }
          }
        });
      });

      describe("prescriptions", () => {
        it("prescriptions can only reference completed appointments", () => {
          for (const p of prescriptions) {
            const appointment = appointments.find(
              (a: { id: string }) => a.id === p.appointment_id,
            );

            expect(appointment).not.toBeUndefined();
            expect(appointment.status).toBe("completed");
          }
        });

        it("prescriptions only reference medications that had stock", () => {
          for (const p of prescriptions) {
            const medication = medications.find(
              (m: { id: string }) => m.id === p.medication_id,
            );

            expect(medication).not.toBeUndefined();
            expect(medication.stock).toBeGreaterThan(0);
          }
        });

        it("quantity must be between 1 and 30", () => {
          for (const p of prescriptions) {
            expect(p.quantity).toBeGreaterThanOrEqual(1);
            expect(p.quantity).toBeLessThanOrEqual(30);
          }
        });
      });

      describe("invoices", () => {
        it("invoices can only reference discharged admissions", () => {
          for (const inv of invoices) {
            const admission = admissions.find(
              (a: { id: string }) => a.id === inv.admission_id,
            );

            expect(admission).not.toBeUndefined();
            expect(admission.discharge_date).not.toBeNull();
          }
        });

        it("an admission can have at most one invoice", () => {
          for (const inv of invoices) {
            const sameAdmission = invoices.filter(
              (o: { admission_id: string }) =>
                o.admission_id === inv.admission_id,
            );

            expect(sameAdmission).toHaveLength(1);
          }
        });

        it("amount must equal the nights of stay times the department's daily_rate", () => {
          for (const inv of invoices) {
            const admission = admissions.find(
              (a: { id: string }) => a.id === inv.admission_id,
            );
            const department = departments.find(
              (d: { id: string }) => d.id === admission.department_id,
            );

            const nights = Math.max(
              1,
              Math.ceil(
                (admission.discharge_date.getTime() -
                  admission.admission_date.getTime()) /
                  (24 * 60 * 60 * 1000),
              ),
            );

            expect(inv.amount).toBe(
              Math.round(nights * department.daily_rate * 100) / 100,
            );
          }
        });
      });

      describe("rooms", () => {
        it("all rooms must have between 1 and 4 beds of capacity", () => {
          for (const r of rooms) {
            expect(r.capacity).toBeGreaterThanOrEqual(1);
            expect(r.capacity).toBeLessThanOrEqual(4);
          }
        });
      });

      describe("patients", () => {
        it("all patients must be between 0 and 100 years old", () => {
          const calculateAge = (date: Date): number => {
            const today = new Date();
            let age = today.getFullYear() - date.getFullYear();
            const month = today.getMonth() - date.getMonth();

            if (
              month < 0 ||
              (month === 0 && today.getDate() < date.getDate())
            ) {
              age--;
            }

            return age;
          };

          for (const p of patients) {
            const age = calculateAge(p.birthdate);

            expect(age).toBeGreaterThanOrEqual(0);
            expect(age).toBeLessThanOrEqual(100);
          }
        });

        it("some patients are uninsured", () => {
          const uninsured = patients.filter(
            (p: { insurance_provider: string | null }) =>
              p.insurance_provider === null,
          );

          expect(uninsured.length).toBeGreaterThan(0);
        });
      });

      describe("medications", () => {
        it("unit_price and stock must be non-negative", () => {
          for (const m of medications) {
            expect(m.unit_price).toBeGreaterThanOrEqual(1);
            expect(m.stock).toBeGreaterThanOrEqual(0);
          }
        });

        it("code must be unique and sequential starting at 1000", () => {
          const codes = medications.map((m: { code: number }) => m.code);

          expect(new Set(codes).size).toBe(codes.length);
          expect(Math.min(...codes)).toBe(1000);
        });
      });
    },
  });

  example.execute();
});
