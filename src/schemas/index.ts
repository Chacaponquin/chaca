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
import { ColorSchema } from "./color/ColorSchema.js";

export class Schemas {
  public readonly internet = new InternetSchema();
  public readonly dataType = new DataTypeSchema();
  public readonly id = new IdSchema();
  public readonly lorem = new LoremSchema();
  public readonly image = new ImageSchema();
  public readonly system = new SystemSchema();
  public readonly finance = new FinanceSchema();
  public readonly phone = new PhoneSchema();
  public readonly address = new AddressSchema();
  public readonly word = new WordSchema();
  public readonly vehicle = new VehicleSchema();
  public readonly date = new DateSchema();
  public readonly person = new PersonSchema();
  public readonly video = new VideoSchema();
  public readonly animal = new AnimalSchema();
  public readonly science = new ScienceSchema();
  public readonly color = new ColorSchema();
}
