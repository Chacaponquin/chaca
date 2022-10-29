## Instalation

```bash
npm install chaca
```

## Usage

```js
import { chaca } from "chaca";

const postSchema = chaca.defineSchema("Post", {
  id: schemas.id.mongodbID(),
  image: schemas.image.film(),
  author: type: schemas.person.firstName({ language: "es" }),
});

const docs = postSchema.generate(20) //Generate 20 objects
```
