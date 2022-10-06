import { CHDataUtils } from './utils/CHDataUtils';
import { CustomSchema } from './utils/CustomSchema';
import { SchemaObject } from './utils/interfaces/schema.interface';

import {
  DataTypeSchema,
  IdSchema,
  InternetSchema,
  MusicSchema,
  LoremSchema,
} from './schemas';

abstract class CHData {
  private static schemasCreated: CustomSchema[];

  public static readonly schemas = {
    music: new MusicSchema(),
    internet: new InternetSchema(),
    dataType: new DataTypeSchema(),
    id: new IdSchema(),
    lorem: new LoremSchema(),
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
