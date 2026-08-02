import { describe, expect, it } from "vitest";
import { ExampleCaseTest } from "../core/example-case";
import { AIRLINE_DATASET } from "./definitions/definition";

describe("Airline case", () => {
  const example = new ExampleCaseTest({
    dataset: AIRLINE_DATASET,
    filename: "airline",
    location: "airline",
    check: (data) => {
      const gates = data["Gate"];
      const aircrafts = data["Aircraft"];
      const routes = data["Route"];
      const flights = data["Flight"];
      const crewMembers = data["CrewMember"];
      const flightCrews = data["FlightCrew"];
      const passengers = data["Passenger"];
      const memberships = data["Membership"];
      const bookings = data["Booking"];
      const checkins = data["CheckIn"];
      const baggages = data["Baggage"];
      const payments = data["Payment"];

      describe("routes", () => {
        it("origin and destination must be different airports", () => {
          for (const r of routes) {
            expect(r.origin_airport_id).not.toBe(r.destination_airport_id);
          }
        });

        it("(origin, destination) pair must be unique", () => {
          for (const r of routes) {
            const samePair = routes.filter(
              (o: {
                origin_airport_id: string;
                destination_airport_id: string;
              }) =>
                o.origin_airport_id === r.origin_airport_id &&
                o.destination_airport_id === r.destination_airport_id,
            );

            expect(samePair).toHaveLength(1);
          }
        });

        it("duration_min must be derived from distance_km", () => {
          for (const r of routes) {
            expect(r.duration_min).toBe(Math.round(r.distance_km / 13) + 30);
          }
        });
      });

      describe("flights", () => {
        it("flight numbers must be unique and start at 100 (sequence)", () => {
          const numbers = new Set(
            flights.map((f: { flight_number: number }) => f.flight_number),
          );

          expect(numbers.size).toBe(flights.length);

          for (const f of flights) {
            expect(f.flight_number).toBeGreaterThanOrEqual(100);
          }
        });

        it("arrival must be departure + route duration", () => {
          for (const f of flights) {
            const route = routes.find(
              (r: { id: string }) => r.id === f.route_id,
            );

            expect(f.arrival.getTime() - f.departure.getTime()).toBe(
              route.duration_min * 60 * 1000,
            );
          }
        });

        it("flights only use active aircrafts", () => {
          for (const f of flights) {
            const aircraft = aircrafts.find(
              (a: { id: string }) => a.id === f.aircraft_id,
            );

            expect(aircraft).not.toBeUndefined();
            expect(aircraft.status).toBe("active");
          }
        });

        it("an aircraft cannot have two overlapping flights", () => {
          for (const f of flights) {
            for (const o of flights) {
              if (o !== f && o.aircraft_id === f.aircraft_id) {
                const overlap =
                  f.departure.getTime() < o.arrival.getTime() &&
                  f.arrival.getTime() > o.departure.getTime();

                expect(overlap).toBe(false);
              }
            }
          }
        });

        it("gate must belong to the origin airport of the route", () => {
          for (const f of flights) {
            if (f.gate_id !== null) {
              const route = routes.find(
                (r: { id: string }) => r.id === f.route_id,
              );
              const gate = gates.find(
                (g: { id: string }) => g.id === f.gate_id,
              );

              expect(gate).not.toBeUndefined();
              expect(gate.airport_id).toBe(route.origin_airport_id);
            }
          }
        });

        it("'departed' and 'landed' flights must have a past departure", () => {
          const now = Date.now();

          for (const f of flights) {
            if (f.status === "departed" || f.status === "landed") {
              expect(f.departure.getTime()).toBeLessThanOrEqual(now);
            }
          }
        });
      });

      describe("crew", () => {
        it("pilots and copilots must have a license, attendants must not", () => {
          for (const c of crewMembers) {
            if (c.role === "attendant") {
              expect(c.license_number).toBeNull();
            } else {
              expect(c.license_number).not.toBeNull();
            }
          }
        });

        it("a crew member cannot be assigned twice to the same flight", () => {
          for (const fc of flightCrews) {
            const same = flightCrews.filter(
              (o: { flight_id: string; crew_member_id: string }) =>
                o.flight_id === fc.flight_id &&
                o.crew_member_id === fc.crew_member_id,
            );

            expect(same).toHaveLength(1);
          }
        });

        it("a flight can have at most 4 crew assignments", () => {
          for (const f of flights) {
            const assigned = flightCrews.filter(
              (fc: { flight_id: string }) => fc.flight_id === f.id,
            );

            expect(assigned.length).toBeLessThanOrEqual(4);
          }
        });

        it("a flight can have at most 2 pilots", () => {
          for (const f of flights) {
            const pilots = flightCrews.filter(
              (fc: { flight_id: string; crew_member_id: string }) => {
                if (fc.flight_id !== f.id) {
                  return false;
                }

                const member = crewMembers.find(
                  (c: { id: string }) => c.id === fc.crew_member_id,
                );

                return member.role === "pilot";
              },
            );

            expect(pilots.length).toBeLessThanOrEqual(2);
          }
        });

        it("crew members must belong to the airline of the flight's aircraft", () => {
          for (const fc of flightCrews) {
            const flight = flights.find(
              (f: { id: string }) => f.id === fc.flight_id,
            );
            const aircraft = aircrafts.find(
              (a: { id: string }) => a.id === flight.aircraft_id,
            );
            const member = crewMembers.find(
              (c: { id: string }) => c.id === fc.crew_member_id,
            );

            expect(member.airline_id).toBe(aircraft.airline_id);
          }
        });
      });

      describe("memberships", () => {
        it("memberships length = passengers with frequent flyer number", () => {
          expect(memberships.length).toBe(
            passengers.filter(
              (p: { frequent_flyer_number: string | null }) =>
                p.frequent_flyer_number !== null,
            ).length,
          );
        });

        it("every membership maps to a passenger with frequent flyer number", () => {
          for (const m of memberships) {
            const passenger = passengers.find(
              (p: { id: string }) => p.id === m.id,
            );

            expect(passenger).not.toBeUndefined();
            expect(passenger.frequent_flyer_number).not.toBeNull();
          }
        });

        it("more bronze memberships than the other tiers", () => {
          const count = (tier: string) =>
            memberships.filter((m: { tier: string }) => m.tier === tier).length;

          expect(count("bronze")).toBeGreaterThan(count("silver"));
          expect(count("bronze")).toBeGreaterThan(count("gold"));
          expect(count("bronze")).toBeGreaterThan(count("platinum"));
        });

        it("points must be between 0 and 100000", () => {
          for (const m of memberships) {
            expect(m.points).toBeGreaterThanOrEqual(0);
            expect(m.points).toBeLessThanOrEqual(100000);
          }
        });
      });

      describe("bookings", () => {
        it("bookings per flight and class cannot exceed the aircraft capacity", () => {
          for (const f of flights) {
            const aircraft = aircrafts.find(
              (a: { id: string }) => a.id === f.aircraft_id,
            );

            const count = (seatClass: string) =>
              bookings.filter(
                (b: { flight_id: string; seat_class: string }) =>
                  b.flight_id === f.id && b.seat_class === seatClass,
              ).length;

            expect(count("economy")).toBeLessThanOrEqual(
              aircraft.capacity_economy,
            );
            expect(count("business")).toBeLessThanOrEqual(
              aircraft.capacity_business,
            );
          }
        });

        it("price must be distance * 0.12 with a 2.5 multiplier for business", () => {
          for (const b of bookings) {
            const flight = flights.find(
              (f: { id: string }) => f.id === b.flight_id,
            );
            const route = routes.find(
              (r: { id: string }) => r.id === flight.route_id,
            );

            const multiplier = b.seat_class === "business" ? 2.5 : 1;
            const price =
              Math.round(route.distance_km * 0.12 * multiplier * 100) / 100;

            expect(b.price).toBe(price);
          }
        });

        it("a passenger cannot book the same flight twice", () => {
          for (const b of bookings) {
            const same = bookings.filter(
              (o: { flight_id: string; passenger_id: string }) =>
                o.flight_id === b.flight_id &&
                o.passenger_id === b.passenger_id,
            );

            expect(same).toHaveLength(1);
          }
        });

        it("booking_date must be before the flight departure", () => {
          for (const b of bookings) {
            const flight = flights.find(
              (f: { id: string }) => f.id === b.flight_id,
            );

            expect(b.booking_date.getTime()).toBeLessThan(
              flight.departure.getTime(),
            );
          }
        });

        it("there are no bookings on cancelled flights", () => {
          for (const b of bookings) {
            const flight = flights.find(
              (f: { id: string }) => f.id === b.flight_id,
            );

            expect(flight.status).not.toBe("cancelled");
          }
        });
      });

      describe("check-ins", () => {
        it("check-ins length = bookings with status 'checked-in'", () => {
          expect(checkins.length).toBe(
            bookings.filter(
              (b: { status: string }) => b.status === "checked-in",
            ).length,
          );
        });

        it("every check-in belongs to a distinct 'checked-in' booking", () => {
          for (const c of checkins) {
            const same = checkins.filter(
              (o: { booking_id: string }) => o.booking_id === c.booking_id,
            );

            expect(same).toHaveLength(1);

            const booking = bookings.find(
              (b: { id: string }) => b.id === c.booking_id,
            );

            expect(booking).not.toBeUndefined();
            expect(booking.status).toBe("checked-in");
          }
        });

        it("seats must be unique per flight", () => {
          for (const c of checkins) {
            const booking = bookings.find(
              (b: { id: string }) => b.id === c.booking_id,
            );

            const sameSeat = checkins.filter(
              (o: { booking_id: string; seat: string }) => {
                const otherBooking = bookings.find(
                  (b: { id: string }) => b.id === o.booking_id,
                );

                return (
                  otherBooking.flight_id === booking.flight_id &&
                  o.seat === c.seat
                );
              },
            );

            expect(sameSeat).toHaveLength(1);
          }
        });

        it("checkin_date must be between booking_date and departure", () => {
          for (const c of checkins) {
            const booking = bookings.find(
              (b: { id: string }) => b.id === c.booking_id,
            );
            const flight = flights.find(
              (f: { id: string }) => f.id === booking.flight_id,
            );

            expect(c.checkin_date.getTime()).toBeGreaterThanOrEqual(
              booking.booking_date.getTime(),
            );
            expect(c.checkin_date.getTime()).toBeLessThanOrEqual(
              flight.departure.getTime(),
            );
          }
        });
      });

      describe("baggage", () => {
        it("tags must be unique (sequence)", () => {
          const tags = new Set(baggages.map((b: { tag: number }) => b.tag));

          expect(tags.size).toBe(baggages.length);
        });

        it("weight must respect the class limit (23kg economy, 32kg business)", () => {
          for (const bag of baggages) {
            const checkin = checkins.find(
              (c: { id: string }) => c.id === bag.checkin_id,
            );
            const booking = bookings.find(
              (b: { id: string }) => b.id === checkin.booking_id,
            );

            const max = booking.seat_class === "business" ? 32 : 23;

            expect(bag.weight_kg).toBeGreaterThanOrEqual(5);
            expect(bag.weight_kg).toBeLessThanOrEqual(max);
          }
        });
      });

      describe("payments", () => {
        it("every booking has exactly one payment", () => {
          expect(payments.length).toBe(bookings.length);

          for (const p of payments) {
            const same = payments.filter(
              (o: { booking_id: string }) => o.booking_id === p.booking_id,
            );

            expect(same).toHaveLength(1);
          }
        });

        it("amount must be the booking price", () => {
          for (const p of payments) {
            const booking = bookings.find(
              (b: { id: string }) => b.id === p.booking_id,
            );

            expect(p.amount).toBe(booking.price);
          }
        });

        it("cancelled bookings must have a refunded payment", () => {
          for (const p of payments) {
            const booking = bookings.find(
              (b: { id: string }) => b.id === p.booking_id,
            );

            if (booking.status === "cancelled") {
              expect(p.status).toBe("refunded");
            } else {
              expect(["completed", "pending"]).toContain(p.status);
            }
          }
        });

        it("created_at must be after the booking date", () => {
          for (const p of payments) {
            const booking = bookings.find(
              (b: { id: string }) => b.id === p.booking_id,
            );

            expect(p.created_at.getTime()).toBeGreaterThanOrEqual(
              booking.booking_date.getTime(),
            );
          }
        });
      });
    },
  });

  example.execute();
});
