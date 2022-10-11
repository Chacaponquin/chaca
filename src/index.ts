import { CHDataUtils } from './utils/CHDataUtils';
import { CustomSchema } from './utils/CustomSchema';
import { SchemaObject } from './utils/interfaces/schema.interface';

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
} from './schemas';

abstract class CHData {
  private static schemasCreated: CustomSchema[];

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
  };

  public readonly utils = CHDataUtils;

  public static defineSchema(schemaName: string, schema: SchemaObject) {
    const newSchema = new CustomSchema(schemaName, schema);
    this.schemasCreated.push(newSchema);
  }

  public static async exportAll(): Promise<void> {
    return;
  }
}

export default CHData;
