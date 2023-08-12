const { chaca, schemas } = require("../../lib/cjs/index");

const USER_SCHEMA = chaca.schema({
  id: chaca.key(schemas.id.uuid()),
  username: schemas.internet.userName(),
});

const POST_SCHEMA = chaca.schema({
  id: chaca.key(schemas.id.uuid()),
  title: schemas.lorem.words(),
  user: chaca.ref("User.id"),
});

module.exports = [
  { name: "User", schema: USER_SCHEMA, documents: 3 },
  { name: "Post", schema: POST_SCHEMA, documents: 10 },
];
