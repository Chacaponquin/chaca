import { chaca, modules } from "../../../src";

export const SCHEMA_WITH_ARRAY_FIELDS = chaca.schema({
  id: chaca.key(() => modules.id.uuid()),
  images: { type: () => modules.image.film(), isArray: 20 },
  name: () => modules.person.firstName({ language: "es" }),
  matrix: () => modules.datatype.matrix({ x_size: 10, y_size: 10 }),
});
