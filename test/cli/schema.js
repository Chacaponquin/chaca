const { chaca, modules } = require("../../lib/cjs/index");

module.exports = chaca.schema({
  id: modules.id.uuid,
  username: modules.internet.username,
  image: { type: modules.image.people, possibleNull: 50 },
  posts: {
    type: modules.id.uuid,
    isArray: {
      min: 1,
      max: 5,
    },
  },
});
