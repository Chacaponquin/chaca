const { chaca, modules } = require("../../lib/cjs/index");

module.exports = chaca.schema({
  id: () => modules.id.uuid(),
  username: () => modules.internet.username(),
  image: { type: () => modules.image.people(), possibleNull: 0.5 },
  posts: {
    type: () => modules.id.uuid(),
    isArray: {
      min: 1,
      max: 5,
    },
  },
});
