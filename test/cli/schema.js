const { chaca, schemas } = require("../../lib/cjs/index.js");

module.exports = chaca.schema({
  id: schemas.id.uuid(),
  username: schemas.internet.userName(),
  image: { type: schemas.image.people(), posibleNull: 50 },
});