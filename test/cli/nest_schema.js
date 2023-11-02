const { chaca, schemas } = require("../../lib/cjs/index");

module.exports = chaca.schema({
  id: chaca.key(chaca.sequence()),
  title: schemas.lorem.words(),
  imageCover: schemas.image.wallpaper(),
  author: chaca.schema({
    name: schemas.person.fullName(),
    age: schemas.dataType.int({ min: 18, max: 90 }),
    email: schemas.internet.email(),
  }),
});
