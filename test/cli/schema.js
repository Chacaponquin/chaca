const { chaca, schemas } = require("../../lib/cjs/index.js");

module.exports = chaca.schema({
  id: chaca.key(chaca.sequence()),
  username: schemas.internet.userName(),
  image: { type: schemas.image.people(), posibleNull: 50 },
  email: schemas.internet.email(),
});
