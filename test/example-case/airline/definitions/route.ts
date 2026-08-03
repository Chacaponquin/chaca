import { chaca, modules } from "../../../../src";

export const ROUTE_SCHEMA = chaca.schema({
  id: chaca.key(() => modules.id.uuid()),
  origin_airport_id: chaca.ref("Airport.id"),
  destination_airport_id: chaca.ref("Airport.id", {
    where: ({ refFields, currentFields, store }) => {
      if (refFields.id === currentFields.origin_airport_id) {
        return false;
      }

      const exists = store
        .currentDocuments()
        .some(
          (r) =>
            r.origin_airport_id === currentFields.origin_airport_id &&
            r.destination_airport_id === refFields.id,
        );

      return !exists;
    },
  }),
  distance_km: () => modules.datatype.int({ min: 300, max: 9000 }),
  duration_min: ({ currentFields }) => {
    return Math.round(currentFields.distance_km / 13) + 30;
  },
});
