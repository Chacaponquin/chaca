import { chaca, modules } from "../../../../src";

const SEAT_LETTERS = "ABCDEF";

export const CHECK_IN_SCHEMA = chaca.schema({
  id: chaca.key(() => modules.id.uuid()),
  booking_id: chaca.ref("Booking.id", {
    unique: true,
    where: ({ refFields }) => {
      return refFields.status === "checked-in";
    },
  }),
  seat: async ({ currentFields, store }) => {
    const bookings = await store.get("Booking");
    const booking = bookings.find((b) => b.id === currentFields.booking_id);

    const index = store.currentDocuments().filter((c) => {
      if (c.id === currentFields.id) {
        return false;
      }

      const other = bookings.find((b) => b.id === c.booking_id);

      return other !== undefined && other.flight_id === booking.flight_id;
    }).length;

    const row = Math.floor(index / SEAT_LETTERS.length) + 1;
    const letter = SEAT_LETTERS[index % SEAT_LETTERS.length];

    return `${row}${letter}`;
  },
  checkin_date: async ({ currentFields, store }) => {
    const bookings = await store.get("Booking");
    const flights = await store.get("Flight");

    const booking = bookings.find((b) => b.id === currentFields.booking_id);
    const flight = flights.find((f) => f.id === booking.flight_id);

    const to = new Date(Math.min(flight.departure.getTime(), Date.now()));

    return modules.date.between({ from: booking.booking_date, to });
  },
});
