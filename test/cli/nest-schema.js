const { chaca, modules } = require("../../lib/index.js");

module.exports = chaca.schema({
  id: chaca.key(chaca.sequence()),
  title: () => modules.lorem.words(),
  imageCover: () => modules.image.wallpaper(),
  author: chaca.schema({
    name: () => modules.person.fullName(),
    age: () => modules.datatype.int({ min: 18, max: 90 }),
    email: () => modules.internet.email(),
  }),
});
