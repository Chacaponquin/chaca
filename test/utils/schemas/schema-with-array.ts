import { chaca, schemas } from "../../../src";

export const SCHEMA_WITH_ARRAY_FIELDS = chaca.schema({
  id: chaca.key(schemas.id.uuid()),
  images: { type: schemas.image.film(), isArray: 20 },
  name: schemas.person.firstName({ language: "es" }),
  matrix: schemas.dataType.matrix({ x_size: 10, y_size: 10 }),
});
