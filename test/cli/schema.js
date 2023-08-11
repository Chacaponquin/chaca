const { chaca, schemas } = require("../../lib/cjs/index.js");

module.exports = chaca.schema({
  username: schemas.internet.userName(),
  image: { type: schemas.image.people(), posibleNull: 50 },
  email: schemas.internet.email(),
});
