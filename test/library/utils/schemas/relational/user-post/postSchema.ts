import { chaca, schemas } from "../../../../../../src";

export const POST_SCHEMA = new chaca.Schema({
  id: chaca.key(schemas.id.mongodbID()),
  title: schemas.word.noun(),
  likes: schemas.dataType.int({ min: 0 }),
  user_id: chaca.ref("User.id"),
});
