import { DatasetSchema } from "../dataset-resolver/interfaces/resolver";
import { DatasetResolver } from "../dataset-resolver/resolver";
import { ExportResolver } from "../export/ExportResolver";
import { FileConfig } from "../export/interfaces/export";

export class Dataset<K = any> {
  constructor(private readonly schemas: DatasetSchema[]) {}

  /**
   * Generate and export data from relational schemas
   * @param schemas Array with the schemas config
   * @param fileConfig.filename file name
   * @param fileConfig.location location of the file
   * @param fileConfig.format file extension (`'java'` | `'csv'` | `'typescript'` | `'json'` | `'javascript'` | `'yaml'` | `'postgresql'` | `'python'`)
   * @param genConfig.verbose Show log in console progretion
   */
  async export(config: FileConfig): Promise<string> {
    const resolver = new ExportResolver(config);
    return await resolver.relational(this.schemas);
  }

  generate(): K {
    const resolver = new DatasetResolver<K>({
      schemas: this.schemas,
      verbose: false,
    });

    return resolver.resolve();
  }
}
