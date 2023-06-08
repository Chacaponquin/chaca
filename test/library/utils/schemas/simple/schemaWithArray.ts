import { chaca, schemas } from "../../../../../src";

export const SCHEMA_WITH_ARRAY_FIELDS = chaca.defineSchema({
  id: { type: schemas.id.mongodbID(), isArray: 20 },
  image: { type: schemas.image.film() },
  name: { type: schemas.person.firstName({ language: "es" }) },
});
