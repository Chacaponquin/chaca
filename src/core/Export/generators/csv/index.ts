import { Generator } from "../generator";
import { DatasetResolver } from "../../../dataset-resolver/resolver";
import { json2csv } from "json-2-csv";
import { DataValidator } from "./core/validator";
import { Route } from "../generator/route";
import { Filename } from "../generator/name";

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

export interface CsvProps {
  zip?: boolean;
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

export class CsvGenerator extends Generator {
  private readonly validator = new DataValidator();

  private readonly zip: boolean;
  private readonly delimiter: Delimiters;
  private readonly excludeKeys: string[];
  private readonly expandNestedObjects: boolean;
  private readonly expandArrayObjects: boolean;
  private readonly keys?: KeyConverter[];
  private readonly parseValue?: ParseValueFunction;
  private readonly sortHeader: boolean;
  private readonly trimHeader: boolean;
  private readonly trimValues: boolean;
  private readonly unwindArrays: boolean;

  constructor(
    filename: string,
    location: string,
    {
      zip = false,
      trim = { fields: false, header: false },
      delimiter = {},
      excludeKeys = [],
      expandArrayObjects = false,
      expandNestedObjects = true,
      keys,
      parseValue,
      sortHeader = false,
      unwindArrays = false,
    }: CsvProps,
  ) {
    super({
      extension: "csv",
      filename: filename,
      location: location,
    });

    this.zip = Boolean(zip);

    this.trimValues = Boolean(trim.fields);
    this.trimHeader = Boolean(trim.header);
    this.parseValue = parseValue;
    this.keys = keys;
    this.unwindArrays = Boolean(unwindArrays);
    this.sortHeader = Boolean(sortHeader);
    this.excludeKeys = excludeKeys;
    this.expandArrayObjects = Boolean(expandArrayObjects);
    this.expandNestedObjects = Boolean(expandNestedObjects);
    this.delimiter = delimiter;
  }

  createContent(data: any): string {
    return json2csv(data, {
      trimFieldValues: this.trimValues,
      trimHeaderFields: this.trimHeader,
      excludeKeys: this.excludeKeys,
      keys: this.keys,
      unwindArrays: this.unwindArrays,
      sortHeader: this.sortHeader,
      expandArrayObjects: this.expandArrayObjects,
      expandNestedObjects: this.expandNestedObjects,
      parseValue: this.parseValue,
      delimiter: { field: this.delimiter.field, eol: this.delimiter.line },
    });
  }

  async createRelationalFile(resolver: DatasetResolver): Promise<string[]> {
    if (this.zip) {
      const allRoutes = [] as Route[];

      for (const r of resolver.getResolvers()) {
        const filename = new Filename(r.getSchemaName());
        const route = await this.setFile(filename, r.resolve());

        allRoutes.push(route);
      }

      const zip = this.createZip();
      zip.multiple(allRoutes);

      return [zip.route];
    } else {
      const filename = new Filename(this.filename);
      const route = await this.setFile(filename, resolver.resolve());

      return [route.value()];
    }
  }

  async createFile(data: any): Promise<string[]> {
    const filename = new Filename(this.filename);
    const route = await this.setFile(filename, data);

    if (this.zip) {
      const zip = this.createZip();
      zip.add(route);

      return [zip.route];
    } else {
      return [route.value()];
    }
  }

  private async setFile(filename: Filename, data: any): Promise<Route> {
    this.validator.execute(data);

    const route = this.generateRoute(filename);
    const content = this.createContent(data);

    await this.writeFile(route, content);

    return route;
  }
}
