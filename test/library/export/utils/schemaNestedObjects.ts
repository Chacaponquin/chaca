import { chaca, schemas } from "../../../../src";

export const TEST_ARRAY_DOCS = new chaca.Schema({
  id: { type: schemas.id.mongodbID(), isArray: 20 },
  image: { type: schemas.image.film() },
  name: { type: schemas.person.firstName({ language: "es" }) },
}).generate(50);
