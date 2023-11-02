const { chaca, schemas } = require("../../lib/cjs/index");

module.exports = chaca.schema({
  id: chaca.key(chaca.sequence()),
  username: schemas.internet.username(),
  image: { type: schemas.image.people(), possibleNull: 50 },
  email: schemas.internet.email(),
  posts: { type: schemas.id.uuid(), isArray: { min: 1, max: 3 } },
});
