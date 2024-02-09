import { DataTypeSchema } from "./dataType/DataTypeSchema";
import { IdSchema } from "./id/IdSchema";
import { InternetSchema } from "./internet/InternetSchema";
import { LoremSchema } from "./lorem/LoremSchema";
import { ImageSchema } from "./image/ImageSchema";
import { SystemSchema } from "./system/SystemSchema";
import { FinanceSchema } from "./finnance/FinanceSchema";
import { PhoneSchema } from "./phone/PhoneSchema";
import { AddressSchema } from "./address/AddressSchema";
import { VehicleSchema } from "./vehicle/VehicleSchema";
import { DateSchema } from "./date/DateSchema";
import { PersonSchema } from "./person/PersonSchema";
import { AnimalSchema } from "./animal/AnimalSchema";
import { ScienceSchema } from "./science/ScienceSchema";
import { WordSchema } from "./word/WordSchema";
import { ColorSchema } from "./color/ColorSchema";

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
  public readonly animal = new AnimalSchema();
  public readonly science = new ScienceSchema();
  public readonly color = new ColorSchema();
}
