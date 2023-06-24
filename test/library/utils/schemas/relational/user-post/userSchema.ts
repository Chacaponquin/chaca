import { chaca, schemas } from "../../../../../../src";

export const USER_SCHEMA = chaca.schema({
  id: chaca.key(schemas.id.mongodbID()),
  age: schemas.dataType.int({ min: 15, max: 90 }),
  username: schemas.internet.userName(),
  image: schemas.image.people(),
});
