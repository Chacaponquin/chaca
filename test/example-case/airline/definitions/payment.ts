import { chaca, modules } from "../../../../src";

export const PAYMENT_SCHEMA = chaca.schema({
  id: chaca.key(() => modules.id.uuid()),
  booking_id: chaca.ref("Booking.id", { unique: true }),
  amount: async ({ currentFields, store }) => {
    const bookings = await store.get("Booking");
    const booking = bookings.find((b) => b.id === currentFields.booking_id);

    return booking.price;
  },
  method: chaca.enum(["credit-card", "transfer", "paypal"]),
  status: async ({ currentFields, store }) => {
    const bookings = await store.get("Booking");
    const booking = bookings.find((b) => b.id === currentFields.booking_id);

    if (booking.status === "cancelled") {
      return "refunded";
    }

    return chaca.utils.oneOfArray(["completed", "pending"]);
  },
  created_at: async ({ currentFields, store }) => {
    const bookings = await store.get("Booking");
    const booking = bookings.find((b) => b.id === currentFields.booking_id);

    return modules.date.between({
      from: booking.booking_date,
      to: new Date(),
    });
  },
});
