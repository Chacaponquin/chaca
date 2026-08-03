import { chaca, modules } from "../../../../src";

export const BOOKING_SCHEMA = chaca.schema({
  id: chaca.key(() => modules.id.uuid()),
  seat_class: chaca.probability([
    { value: "economy", chance: 0.8 },
    { value: "business", chance: 0.2 },
  ]),
  flight_id: chaca.ref("Flight.id", {
    where: async ({ refFields, currentFields, store }) => {
      if (refFields.status === "cancelled") {
        return false;
      }

      const aircrafts = await store.get("Aircraft");
      const aircraft = aircrafts.find((a) => a.id === refFields.aircraft_id);

      const capacity =
        currentFields.seat_class === "business"
          ? aircraft.capacity_business
          : aircraft.capacity_economy;

      const sold = store
        .currentDocuments()
        .filter(
          (b) =>
            b.flight_id === refFields.id &&
            b.seat_class === currentFields.seat_class,
        ).length;

      return sold < capacity;
    },
  }),
  passenger_id: chaca.ref("Passenger.id", {
    where: ({ refFields, currentFields, store }) => {
      const exists = store
        .currentDocuments()
        .some(
          (b) =>
            b.flight_id === currentFields.flight_id &&
            b.passenger_id === refFields.id,
        );

      return !exists;
    },
  }),
  price: async ({ currentFields, store }) => {
    const flights = await store.get("Flight");
    const routes = await store.get("Route");

    const flight = flights.find((f) => f.id === currentFields.flight_id);
    const route = routes.find((r) => r.id === flight.route_id);

    const multiplier = currentFields.seat_class === "business" ? 2.5 : 1;

    return Math.round(route.distance_km * 0.12 * multiplier * 100) / 100;
  },
  booking_date: async ({ currentFields, store }) => {
    const flights = await store.get("Flight");
    const flight = flights.find((f) => f.id === currentFields.flight_id);

    const departure = flight.departure.getTime();
    const from = new Date(departure - 120 * 24 * 60 * 60 * 1000);
    const to = new Date(Math.min(departure - 60 * 60 * 1000, Date.now()));

    return modules.date.between({ from, to });
  },
  status: chaca.probability([
    { value: "confirmed", chance: 0.5 },
    { value: "checked-in", chance: 0.35 },
    { value: "cancelled", chance: 0.15 },
  ]),
});
