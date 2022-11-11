## Instalation

```bash
 $ npm install chaca
```

## Usage

```js
import { chaca, schemas } from "chaca";

const postSchema = chaca.defineSchema("Post", {
  id: schemas.id.uuid(),
  authors: {
    type: schemas.person.fullName({ language: "es" }),
    isArray: 5,
  },
  image: schemas.image.film(),
});

const docs = postSchema.generate(20);
//Generate 20 objects with the defined schema
//Example:
//[{
//  id: "4136cd0b-d90b-4af7-b485-5d1ded8db252",
//  authors: [
//    "Olivia Gonzalez Gomez",
//    "Santiago Torres Gil",
//    "Amelia Ruiz Muñoz",
//    "Camila Santiago Garcia",
//    "Javier Moreno, Romero",
//  ],
//  image:
//    "https://images.unsplash.com/photo-1534684686641-05569203ecca?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwzNTM2NjZ8MHwxfHNlYXJjaHw1fHxmaWxtfGVufDB8fHx8MTY2Njk3MDgyMQ&ixlib=rb-4.0.3&q=80",
//}, ...rest];

postSchema.generateAndExport(20, {
  fileName: "data",
  format: "json",
  location: "./folder",
}); //Generate 20 objects and export them in a json file
```

## Config API

### `type`

Indicates the `Schema Field` or the Schema that would be the field

```ts
// With a defined Schema Field
type: schemas.image.film();

//With a custom field schema
const mySchemaField = chaca.defineSchemaField("mySchemaField", (args) => {
  return args.a + args.b;
});
type: mySchemaField({ a: 10, b: 20 });

// You can also make field an object of information using an nested schema
type: new chaca.Schema({
  firstName: schemas.person.firstName(),
  favoriteCats: {
    type: schemas.animal.cat(),
    isArray: { min: 1, max: 10 },
  },
  description: schemas.lorem.text(),
});
```

### `enum`

Array of values that the field can take

```ts
enum: ['Hello World', 'Hi Friend', 'My Name is Hector'] // Returns on of this values
```

> **Note** If you pass an empty array `[]` an error will be sent

### `custom`

A custom function that has access to values of the fields of the document in which it is located

```ts
// Simple Function
{
  id: () => {
    return "Hi!!!";
  }; // The field `id` always be 'Hi!!!'
}

// You can access to own object properties
{
  name: schemas.person.firstName(),
  age: schemas.dataType.int({min: 18, max: 80}),
  sex: schemas.person.sex(),
  isOlder: {
    custom: (doc) => {
      if(doc.age < 60) return false
      else return true
    }
  }
}

// Example return documents
{
  name: 'Juan',
  age: 23,
  sex: 'Male',
  isOlder: false
}

//or
{
  name: 'Camila',
  age: 67,
  sex: 'Female',
  isOlder: true
}
```

### `isArray`

Indicates if the field is an array of values of the the selected schema

```ts
isArray: true; // The field would be an array with length between 0 and 10
isArray: { min: 5, max: 10 } // the field would be an array with length between 5 and 10
isArray: 20 // The field would be an array with length 20
```

### `posibleNull`

Indicates the possibility that the field returns `null`

```ts
posibleNull: true; // the field has a 50% chance of being null

//The number indicates de chance porcent
posibleNull: 60; // the field has a 60% chance of being null
```

## Export API

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

We have several defined schemas that can be used for data creation. You can use them by importing the `schemas` module

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
schemas.dataType.int().getValue({ min: 0, max: 20 }); // 15;
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
schemas.finance.accountType().getValue(); // 'Personal Loan Account';
schemas.finance.bic().getValue(); // 'WYAUPGX1432';
schemas.finance.routingNumber().getValue(); // '522814402'
schemas.finance.creditCardCVV().getValue(); // '506';
schemas.finance.moneySymbol().getValue(); // '$';
schemas.finance.amount({ min: 1000, max: 35000, symbol: "$" }).getValue(); // '$2400';
schemas.finance.currencyMoneyName().getValue(); // 'US Dollar';
schemas.finance.moneyCode().getValue(); // 'USD'
```

### `.date`

Date Schema

```ts
schemas.date.soon().getValue(); // Return a soon date from now;
schemas.date.past().getValue(); // Return a past date from now
schemas.date.future().getValue(); // Return a future date from now
schemas.date.month().getValue(); // 'June'
schemas.date.weekDay().getValue(); // 'Monday'
schemas.date.birthdate({ min: 18, max: 65 }).getValue(); // Return a birthdate date between 18 and 65 years person
schemas.date.between({ from, to }).getValue(); // Return a date between two dates
schemas.date.timeAgo().getValue(); // '23 hours ago'
```

### `.animal`

Animal Schema

```ts
schemas.animal.dog().getValue(); // 'Irish Water Spaniel'
schemas.animal.bear().getValue(); // 'Asian black bear'
schemas.animal.bird().getValue(); // 'Buller's Shearwater'
schemas.animal.cat().getValue(); // 'Singapura'
schemas.animal.catacean().getValue(); // 'Spinner Dolphin'
schemas.animal.cow().getValue(); // 'Brava'
schemas.animal.crocodilia().getValue(); // 'Philippine Crocodile'
schemas.animal.fish().getValue(); // 'Mandarin fish'
schemas.animal.horse().getValue(); // 'Swedish Warmblood'
schemas.animal.insect().getValue(); // 'Pyramid ant'
schemas.animal.lion().getValue(); // 'Northeast Congo Lion'
schemas.animal.rabbit().getValue(); // 'Florida White'
schemas.animal.rodent().getValue(); // 'Cuscomys ashanika'
schemas.animal.snake().getValue(); // 'Eyelash viper'
schemas.animal.animalType().getValue(); // 'crocodilia'
```

### `.id`

ID Schema

```ts
schemas.id.numberRow().getValue(); // 1664755445878
schemas.id.mongodbID().getValue(); // 'e175cac316a79afdd0ad3afb'
schemas.id.uuid().getValue(); // '4136cd0b-d90b-4af7-b485-5d1ded8db252'
```

### `.image`

Image Schema

```ts
schemas.image.food().getValue(); // Return a food url image
schemas.image.event().getValue(); // Return a event url image
schemas.image.wallpaper().getValue(); // Return a wallpaper url image
schemas.image.treeDimension().getValue(); // Return a 3D url image
schemas.image.architecture().getValue(); // Return a architecture url image
schemas.image.nature().getValue(); // Return a nature url image
schemas.image.fashion().getValue(); // Return a fashion url image
schemas.image.film().getValue(); // Return a film url image
schemas.image.people().getValue(); // Return a people url image
schemas.image.health().getValue(); // Return a health url image
schemas.image.house().getValue(); // Return a house url image
schemas.image.street().getValue(); // Return a street url image
schemas.image.animal().getValue(); // Return a animal url image
schemas.image.spiritual().getValue(); // Return a spiritual url image
schemas.image.travel().getValue(); // Return a travel url image
schemas.image.art().getValue(); // Return a art url image
schemas.image.history().getValue(); // Return a history url image
schemas.image.sport().getValue(); // Return a sport url image
```

### `.video`

Video Schema

```ts
schemas.video.food().getValue(); // Return a food url video
schemas.video.event().getValue(); // Return a event url video
schemas.video.wallpaper().getValue(); // Return a wallpaper url video
schemas.video.treeDimension().getValue(); // Return a 3D url video
schemas.video.architecture().getValue(); // Return a architecture url video
schemas.video.nature().getValue(); // Return a nature url video
schemas.video.fashion().getValue(); // Return a fashion url video
schemas.video.film().getValue(); // Return a film url video
schemas.video.people().getValue(); // Return a people url video
schemas.video.health().getValue(); // Return a health url video
schemas.video.house().getValue(); // Return a house url video
schemas.video.street().getValue(); // Return a street url video
schemas.video.animal().getValue(); // Return a animal url video
schemas.video.spiritual().getValue(); // Return a spiritual url video
schemas.video.travel().getValue(); // Return a travel url video
schemas.video.art().getValue(); // Return a art url video
schemas.video.history().getValue(); // Return a history url video
schemas.video.sport().getValue(); // Return a sport url video
```

### `.internet`

Internet Schema

```ts
schemas.internet.domainName().getValue(); // 'slow-timer.info';
schemas.internet.email().getValue({ provider: "yahoo" }); // 'Jeanne63@yahoo.com';
schemas.internet.password().getValue(); // 'lawetimufozujosodedi'
schemas.internet.url().getValue(); // 'https://remarkable-hackwork.info'
schemas.internet.userName().getValue(); //'Nettie_Zboncak40'
schemas.internet.httpMethod().getValue(); // 'GET';
schemas.internet.emoji().getValue(); // '🥰';
schemas.internet.mac().getValue(); // '32:8e:2e:09:c6:05'
schemas.internet.port().getValue(); // '9414'
schemas.internet.ipv4().getValue(); // '245.108.222.0'
schemas.internet.userAgent().getValue(); // 'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_8_8)  AppleWebKit/536.0.2 (KHTML, like Gecko) Chrome/27.0.849.0 Safari/536.0.2'
schemas.internet.protocol().getValue(); // 'http';
schemas.internet.domainSuffix().getValue(); // 'com'
schemas.internet.domainWord().getValue(); // 'close-reality'
schemas.internet.httpStatusCode().getValue(); // 200;
```

### `.lorem`

Lorem Schema

```ts
schemas.lorem.slug().getValue();
schemas.lorem.sentences().getValue();
schemas.lorem.words().getValue();
schemas.lorem.text().getValue();
```

### `.person`

Person Schema

```ts
schemas.person.jobTitle().getValue(); // 'Global Accounts Engineer'
schemas.person.jobType().getValue(); // 'Assistant'
schemas.person.jobArea().getValue(); // 'Brand'
schemas.person.gender().getValue(); // Trans*Women
schemas.person.sex().getValue(); // 'Female'
schemas.person.firstName().getValue({ sex: "male" }); // 'Juan'
schemas.person.lastName().getValue({ language: "es" }); // 'Gonzalez'
schemas.person.fullName().getValue(); // 'Juan Gonzalez Perez'
schemas.person.prefix().getValue(); // 'Miss';
```

### `.phone`

Phone Schema

```ts
schemas.phone.number().getValue(); // '501-039-841';
schemas.phone.number().getValue(); // '+53'
schemas.phone.callDuration().getValue(); // '27:30'
```

### `.science`

Science Schema

```ts
schemas.science.periodicTableElement().getValue(); // 'Neon'
schemas.science.unit().getValue(); // 'kg'
```

### `.system`

System Schema

```ts
schemas.system.fileName().getValue(); // 'bike_table.res.vcs';
schemas.system.fileExt().getValue(); // 'gif'
schemas.system.directoryPath().getValue(); // '/etc/mail'
schemas.system.filePath().getValue(); // '/usr/local/src/money.dotx'
schemas.system.semServer().getValue(); // '1.1.2'
```

### `.vehicle`

Vehicle Schema

```ts
schemas.vehicle.bicycle().getValue(); // 'Adventure Road Bicycle'
schemas.vehicle.manufacturer().getValue(); // 'Ford'
schemas.vehicle.vehicleModel().getValue(); // 'Explorer';
schemas.vehicle.vehicleType().getValue(); // 'Coupe'
schemas.vehicle.vehicle().getValue(); // 'BMW Explorer'
schemas.vehicle.fuel().getValue(); // 'Diesel'
```

### `.word`

Word Schema

```ts
schemas.word.adjective().getValue(); // 'salado';
schemas.word.conjuction().getValue(); // 'pero';
schemas.word.interjection().getValue(); // '!ay!';
schemas.word.preposition().getValue(); // 'hasta';
schemas.word.adverb().getValue(); // 'delante';
schemas.word.verb().getValue(); // 'ser';
schemas.word.noun().getValue(); // 'plato';
```

## Schema Fields

If none of the defined schemas are useful you can create your own schemas with the `defineSchemaField` method.

### Javascript

```js
import { chaca } from "chaca";

// Define Field Schema
const mySchemaField = chaca.defineSchemaField("mySchemaField", (args) => {
  return args.a + args.b;
});

// Usage
const mySchema = new chaca.Schema({
  sum: mySchemaField({ a: 5, b: 10 }), // In all the generated objects the sum field is 15
});
```

### Typescript

```ts
import { chaca } from "chaca";

type SchemaArguments = {
  a: number;
  b: number;
};

// Define Schema Field
const mySchemaField = chaca.defineSchemaField<SchemaArguments>(
  "mySchemaField",
  (args) => {
    return args.a + args.b;
  },
);

// Usage
const mySchema = new chaca.Schema({
  sum: mySchemaField({ a: 5, b: 10 }), // In all the generated objects the sum field is 15
});
```

## Contributing

The Chaca project welcomes all constructive contributions. Contributions take many forms, from code for bug fixes and enhancements, to additions and fixes to documentation, additional tests, triaging incoming pull requests and issues, and more!
