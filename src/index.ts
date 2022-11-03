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
  WordSchema,
  VehicleSchema,
  DateSchema,
  PersonSchema,
  VideoSchema,
  AnimalSchema,
  CodeSchema,
  ScienceSchema,
} from "./schemas";
import { CHDataError } from "./errors/CHDataError";
import { FileConfig } from "./utils/interfaces/export.interface";

abstract class Chaca {
  private static schemasCreated: CustomSchema[] = [];
  public static utils = CHDataUtils;
  /**
   *
   * @param {string} schemaName schema name
   * @throws The name of schema can't be an empty string, or a repetive name
   *
   * @param schemaObj The object with the keys and type of each field
   * @example { id: chData.schemas.id.numberRow(), image: chData.schemas.image.film(), name: chData.schemas.person.firstName()}
   */
  public static defineSchema(
    schemaName: string,
    schemaObj: SchemaObject<SchemaConfig>,
  ): CustomSchema {
    const findSchema = this.schemasCreated.find(
      (el) => el.schemaName === schemaName,
    );
    if (!findSchema) {
      const newSchema = new CustomSchema(schemaName, schemaObj);
      this.schemasCreated.push(newSchema);
      return newSchema;
    } else throw new CHDataError("Already exists a schema with that name");
  }

  public static async exportAll(config: FileConfig): Promise<void> {
    for (const s of this.schemasCreated) {
      await s.generateAndExport(20, config);
    }
  }
}

export const chaca = Chaca;
export const schemas = {
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
