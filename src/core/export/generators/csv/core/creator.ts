import { json2csv } from "json-2-csv";
import { DataValidator } from "./validator";

interface KeyConverter {
  field: string;
  title: string;
}

type ParseValueFunction = (
  value: any,
  defaultParser: (v: any) => string,
) => string;

interface TrimProps {
  header?: boolean;
  field?: boolean;
}

interface Delimiters {
  wrap?: string;
  field?: string;
  eol?: string;
}

export interface CodeProps {
  /**
   * Specifies the different types of delimiters
   * @param delimiter.wrap wrap values in the delimiter of choice (e.g. wrap values in quotes). Default `"`
   * @param delimiter.field field delimiter. Default `,`
   * @param delimiter.eol end of line delimiter. Default `\n`
   */
  delimiter?: Delimiters;
  /**
   * Specify the string keys that should be excluded from the output
   */
  excludeKeys?: string[];
  /**
   * Should nested objects be deep-converted to CSV? Default `true`
   */
  expandNestedObjects?: boolean;
  /**
   * Should objects in array values be deep-converted to CSV? Default `false`
   */
  expandArrayObjects?: boolean;
  /**
   * Specify the keys that should be converted.
   *
   * @param key.field specifies the key path
   * @param key.title specifies a more human readable field heading
   */
  keys?: KeyConverter[];
  /**
   * Specify how values should be converted into CSV format. This function is provided a single field value at a time and must return a `string`
   */
  parseValue?: ParseValueFunction;
  /**
   * Should the header keys be sorted in alphabetical order? Default `false`
   */
  sortHeader?: boolean;
  /**
   * @param trim.header should the header fields be trimmed? Default `false`
   * @param trim.field should the field values be trimmed? Default `false`
   */
  trim?: TrimProps;
  /**
   * Should array values be "unwound" such that there is one line per value in the array? Default `false`
   */
  unwindArrays?: boolean;
}

export class CsvCodeCreator {
  constructor(
    private readonly config: CodeProps,
    private readonly validator: DataValidator,
  ) {}

  execute(data: any): string {
    this.validator.execute(data);

    return json2csv(data, {
      trimFieldValues: this.config.trim?.field,
      trimHeaderFields: this.config.trim?.header,
      excludeKeys: this.config.excludeKeys,
      keys: this.config.keys,
      unwindArrays: this.config.unwindArrays,
      sortHeader: this.config.sortHeader,
      expandArrayObjects: this.config.expandArrayObjects,
      expandNestedObjects: this.config.expandNestedObjects,
      parseValue: this.config.parseValue,
      delimiter: {
        field: this.config.delimiter?.field,
        eol: this.config.delimiter?.eol,
        wrap: this.config.delimiter?.wrap,
      },
    });
  }
}
