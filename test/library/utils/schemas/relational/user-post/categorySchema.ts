import { chaca, schemas } from "../../../../../../src";

export const POST_CATEGORY_SCHEMA = chaca.defineSchema({
  id: schemas.id.uuid(),
  categoryName: schemas.word.adjective(),
  postID: chaca.ref("Post.id"),
});
