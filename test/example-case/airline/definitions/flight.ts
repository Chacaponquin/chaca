import { chaca, modules } from "../../../../src";

export const FLIGHT_SCHEMA = chaca.schema({
  id: chaca.key(() => modules.id.uuid()),
  flight_number: chaca.sequence({ startsWith: 100 }),
  route_id: chaca.ref("Route.id"),
  departure: () => {
    const from = new Date();
    from.setMonth(from.getMonth() - 3);

    const to = new Date();
    to.setMonth(to.getMonth() + 2);

    return modules.date.between({ from, to });
  },
  arrival: async ({ currentFields, store }) => {
    const routes = await store.get("Route");
    const route = routes.find((r) => r.id === currentFields.route_id);

    return new Date(
      currentFields.departure.getTime() + route.duration_min * 60 * 1000,
    );
  },
  aircraft_id: chaca.ref("Aircraft.id", {
    where: ({ refFields, currentFields, store }) => {
      if (refFields.status !== "active") {
        return false;
      }

      const overlap = store
        .currentDocuments()
        .some(
          (f) =>
            f.aircraft_id === refFields.id &&
            currentFields.departure.getTime() < f.arrival.getTime() &&
            currentFields.arrival.getTime() > f.departure.getTime(),
        );

      return !overlap;
    },
  }),
  gate_id: chaca.ref("Gate.id", {
    nullOnEmpty: true,
    where: async ({ refFields, currentFields, store }) => {
      const routes = await store.get("Route");
      const route = routes.find((r) => r.id === currentFields.route_id);

      if (route) {
        return refFields.airport_id === route.origin_airport_id;
      }

      return false;
    },
  }),
  status: ({ currentFields }) => {
    if (currentFields.departure.getTime() > Date.now()) {
      return chaca.utils.oneOfArray(["scheduled", "boarding", "cancelled"]);
    }

    return chaca.utils.oneOfArray(["departed", "landed", "cancelled"]);
  },
});
