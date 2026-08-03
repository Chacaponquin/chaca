import { chaca, modules } from "../../../../src";

export const BAGGAGE_SCHEMA = chaca.schema({
  id: chaca.key(() => modules.id.uuid()),
  tag: chaca.sequence({ startsWith: 1000 }),
  checkin_id: chaca.ref("CheckIn.id"),
  weight_kg: async ({ currentFields, store }) => {
    const checkins = await store.get("CheckIn");
    const bookings = await store.get("Booking");

    const checkin = checkins.find((c) => c.id === currentFields.checkin_id);
    const booking = bookings.find((b) => b.id === checkin.booking_id);

    const max = booking.seat_class === "business" ? 32 : 23;

    return modules.datatype.float({ precision: 1, min: 5, max });
  },
});
