const { chaca, modules } = require("../../../dist");

module.exports = chaca.schema({
  id: chaca.key(chaca.sequence()),
  username: () => modules.internet.username(),
  image: { type: () => modules.image.people(), possibleNull: 0.5 },
  email: () => modules.internet.email(),
  posts: { type: () => modules.id.uuid(), isArray: { min: 1, max: 3 } },
});
