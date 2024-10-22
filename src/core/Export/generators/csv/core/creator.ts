import { json2csv } from "json-2-csv";

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
  fields?: boolean;
}

interface Delimiters {
  line?: string;
  field?: string;
}

export interface CodeProps {
  delimiter?: Delimiters;
  excludeKeys?: string[];
  expandNestedObjects?: boolean;
  expandArrayObjects?: boolean;
  keys?: KeyConverter[];
  parseValue?: ParseValueFunction;
  sortHeader?: boolean;
  trim?: TrimProps;
  unwindArrays?: boolean;
}

export class CsvCodeCreator {
  constructor(private readonly config: CodeProps) {}

  execute(data: any): string {
    return json2csv(data, {
      trimFieldValues: this.config.trim?.fields,
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
        eol: this.config.delimiter?.line,
      },
    });
  }
}
