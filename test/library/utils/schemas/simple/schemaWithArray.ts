import { chaca, schemas } from "../../../../../src";

export const SCHEMA_WITH_ARRAY_FIELDS = chaca.defineSchema({
  id: schemas.id.mongodbID(),
  images: { type: schemas.image.film(), isArray: 20 },
  name: schemas.person.firstName({ language: "es" }),
});
