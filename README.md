## Instalation

```bash
 $ npm install chaca
```

## Usage

```js
import { chaca, schemas } from "chaca";

const postSchema = chaca.defineSchema("Post", {
  id: schemas.id.mongodbID(),
  images: {
    type: schemas.image.film(),
    isArray: 20,
  },
  author: schemas.person.firstName({ language: "es" }),
});

const docs = postSchema.generate(20); //Generate 20 objects

postSchema.generateAndExport(20, {
  fileName: "data",
  format: "json",
  location: "./folder",
}); //Generate 20 objects and export them in a json file
```

## Export Api

```js
{
  //Name of the file that will be export
  fileName: "data",

  //Extension of the file data
  // You can export in `json`, `csv`, `java`, `javascript`, `typescript`
  format: "json",

  //Location of the folder that will be our data
  location: "./folder"
}
```

## Schemas

```ts
import { schemas } from "chaca";
```

### `.address`

Address Schema

```ts
schemas.address.zipCode().getValue(); // 17800
schemas.address.timeZone().getValue(); // 'Pacific/Guam'
schemas.address.cardinalDirection().getValue(); // 'North'
schemas.address.country().getValue({ continent: "Europe" }); // 'Spain';
schemas.address.countryCode().getValue(); // 'SJ';
```

### `.dataType`

DataType Schema

```ts
schemas.dataType.boolean().getValue(); // true;
schemas.dataType.number().getValue({ min: 0, max: 20 }); // 15;
schemas.dataType.hexadecimal().getValue(); // '#f12a974eB1'
schemas.dataType.float().getValue(); // 15.2;
schemas.dataType.matriz({ x_size: 4, y_size: 3 }).getValue(); // [[0, 3, 4, 1], [1, 2, 3], [0, 0, 1]]
schemas.dataType
  .customArray()
  .getValue({ array: [5, { hi: "Hello" }, "Chaca the best!!"] }); // 'Chaca the best!!'
schemas.dataType.characters().getValue(); // 'a';
```

### `.finance`

Finance Schema

```ts
schemas.finance.pin().getValue(); // '5076'
schemas.finance.bitcoinAddress().getValue(); //  '3ySdvCkTLVy7gKD4j6JfSaf5d'
schemas.finance.creditCard().getValue(); // '4427163488662'
schemas.finance.ethereumAddress().getValue(); // '0xf03dfeecbafc5147241cc4c4ca20b3c9dfd04c4a';
schemas.finance.accountName().getValue(); // 'Personal Loan Account';
schemas.finance.bic().getValue(); // 'WYAUPGX1432';
schemas.finance.routingNumber().getValue(); // '522814402'
schemas.finance.creditCardCVV().getValue(); // '506';
schemas.finance.moneySymbol().getValue(); // '$';
schemas.finance.amount({ min: 1000, max: 35000, symbol: "$" }).getValue(); // '$2400';
schemas.finance.currencyMoneyName().getValue(); // 'US Dollar';
schemas.finance.moneyCode().getValue(); // 'USD'
```
