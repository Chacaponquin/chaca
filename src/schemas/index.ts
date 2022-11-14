import { DataTypeSchema } from "./dataType/DataTypeSchema.js";
import { IdSchema } from "./id/IdSchema.js";
import { InternetSchema } from "./internet/InternetSchema.js";
import { LoremSchema } from "./lorem/LoremSchema.js";
import { ImageSchema } from "./image/ImageSchema.js";
import { SystemSchema } from "./system/SystemSchema.js";
import { FinanceSchema } from "./finnance/FinanceSchema.js";
import { PhoneSchema } from "./phone/PhoneSchema.js";
import { AddressSchema } from "./address/AddressSchema.js";
import { VehicleSchema } from "./vehicle/VehicleSchema.js";
import { DateSchema } from "./date/DateSchema.js";
import { PersonSchema } from "./person/PersonSchema.js";
import { VideoSchema } from "./video/VideoSchema.js";
import { AnimalSchema } from "./animal/AnimalSchema.js";
import { ScienceSchema } from "./science/ScienceSchema.js";
import { WordSchema } from "./word/WordSchema.js";

export const Schemas = {
  internet: new InternetSchema(),
  dataType: new DataTypeSchema(),
  id: new IdSchema(),
  lorem: new LoremSchema(),
  image: new ImageSchema(),
  system: new SystemSchema(),
  finance: new FinanceSchema(),
  phone: new PhoneSchema(),
  address: new AddressSchema(),
  word: new WordSchema(),
  vehicle: new VehicleSchema(),
  date: new DateSchema(),
  person: new PersonSchema(),
  video: new VideoSchema(),
  animal: new AnimalSchema(),
  science: new ScienceSchema(),
};
