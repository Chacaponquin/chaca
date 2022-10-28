import { CHDataUtils } from "./utils/CHDataUtils";
import { CustomSchema } from "./utils/CustomSchema";
import {
  SchemaConfig,
  SchemaObject,
} from "./utils/interfaces/schema.interface";

import {
  DataTypeSchema,
  IdSchema,
  InternetSchema,
  MusicSchema,
  LoremSchema,
  ImageSchema,
  FinanceSchema,
  SystemSchema,
  PhoneSchema,
  AddressSchema,
  LanguageSchema,
  VehicleSchema,
  DateSchema,
  PersonSchema,
  VideoSchema,
  AnimalSchema,
  CodeSchema,
  ScienceSchema,
} from "./schemas";
import { CHDataError } from "./errors/CHDataError";

abstract class CHData {
  private static schemasCreated: CustomSchema[] = [];

  public static readonly schemas = {
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
    language: new LanguageSchema(),
    vehicle: new VehicleSchema(),
    date: new DateSchema(),
    person: new PersonSchema(),
    video: new VideoSchema(),
    animal: new AnimalSchema(),
    code: new CodeSchema(),
    science: new ScienceSchema(),
  };

  public readonly utils = CHDataUtils;

  public static defineSchema(
    schemaName: string,
    schema: SchemaObject<SchemaConfig>,
  ): CustomSchema {
    const findSchema = this.schemasCreated.find(
      (el) => el.schemaName === schemaName,
    );
    if (!findSchema) {
      const newSchema = new CustomSchema(schemaName, schema);
      this.schemasCreated.push(newSchema);
      return newSchema;
    } else throw new CHDataError("Already exists a schema with that name");
  }

  public static async exportAll(): Promise<void> {
    return;
  }
}

export default CHData;
