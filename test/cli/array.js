const { chaca, modules } = require("../../lib/cjs/index");

module.exports = chaca.schema({
  id: chaca.key(chaca.sequence()),
  username: modules.internet.username,
  image: { type: modules.image.people, possibleNull: 50 },
  email: modules.internet.email,
  posts: { type: modules.id.uuid, isArray: { min: 1, max: 3 } },
});
