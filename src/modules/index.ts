import { DatatypeModule } from "./datatype";
import { IdModule } from "./id";
import { InternetModule } from "./internet";
import { LoremModule } from "./lorem";
import { ImageModule } from "./image";
import { SystemModule } from "./system";
import { FinanceModule } from "./finance";
import { PhoneModule } from "./phone";
import { AddressModule } from "./address";
import { VehicleModule } from "./vehicle";
import { DateModule } from "./date";
import { PersonModule } from "./person";
import { AnimalModule } from "./animal";
import { ScienceModule } from "./science";
import { WordModule } from "./word";
import { ColorModule } from "./color";
import { Module } from "./module";

export { Module };

export class ChacaModules {
  readonly internet = new InternetModule();
  readonly datatype = new DatatypeModule();
  readonly id = new IdModule();
  readonly lorem = new LoremModule();
  readonly image = new ImageModule();
  readonly system = new SystemModule();
  readonly finance = new FinanceModule();
  readonly phone = new PhoneModule();
  readonly address = new AddressModule();
  readonly word = new WordModule();
  readonly vehicle = new VehicleModule();
  readonly date = new DateModule();
  readonly person = new PersonModule();
  readonly animal = new AnimalModule();
  readonly science = new ScienceModule();
  readonly color = new ColorModule();
}
