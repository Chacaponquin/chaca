const { chaca, schemas } = require("../../lib/cjs/index");

module.exports = chaca.schema({
  id: schemas.id.uuid(),
  username: schemas.internet.username(),
  image: { type: schemas.image.people(), possibleNull: 50 },
  posts: {
    type: schemas.id.uuid(),
    isArray: {
      min: 1,
      max: 5,
    },
  },
});
