import { DataTypeSchema } from "./dataType/DataTypeSchema";
import { IdSchema } from "./id/IdSchema";
import { InternetSchema } from "./internet/InternetSchema";
import { MusicSchema } from "./music/MusicSchema";
import { LoremSchema } from "./lorem/LoremSchema";
import { ImageSchema } from "./image/ImageSchema";
import { SystemSchema } from "./system/SystemSchema";
import { FinanceSchema } from "./finnance/FinanceSchema";
import { PhoneSchema } from "./phone/PhoneSchema";
import { AddressSchema } from "./address/AddressSchema";
import { VehicleSchema } from "./vehicle/VehicleSchema";
import { DateSchema } from "./date/DateSchema";
import { PersonSchema } from "./person/PersonSchema";
import { VideoSchema } from "./video/VideoSchema";
import { AnimalSchema } from "./animal/AnimalSchema";
import { CodeSchema } from "./code/CodeSchema";
import { ScienceSchema } from "./science/ScienceSchema";
import { WordSchema } from "./word/WordSchema";

export const Schemas = {
  music: new MusicSchema(),
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
  code: new CodeSchema(),
  science: new ScienceSchema(),
};
