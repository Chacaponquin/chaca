const { chaca, modules } = require("../../../lib");

const USER_SCHEMA = chaca.schema({
  id: chaca.key(() => modules.id.uuid()),
  username: () => modules.internet.username(),
});

const POST_SCHEMA = chaca.schema({
  id: chaca.key(() => modules.id.uuid()),
  title: () => modules.lorem.words(),
  user: chaca.ref("User.id"),
});

module.exports = chaca.dataset([
  { name: "", schema: USER_SCHEMA, documents: 3 },
  { name: "Post", schema: POST_SCHEMA, documents: 10 },
]);
