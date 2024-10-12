import { Generator } from "../generator";
import fs from "fs";
import path from "path";
import { DatasetResolver } from "../../../dataset-resolver/resolver";
import { json2csv } from "json-2-csv";
import { DataValidator } from "./core/validator";

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

  async createRelationalFile(resolver: DatasetResolver): Promise<string> {
    const allData = resolver.resolve();
    const allRoutes = [] as string[];

    for (const [key, data] of Object.entries(allData)) {
      const route = await this.setFile(key, data);
      allRoutes.push(route);
    }

    if (this.zip) {
      const { zip, zipPath } = this.createZip();

      for (const route of allRoutes) {
        zip.addLocalFile(route);
        await fs.promises.unlink(route);
      }

      zip.writeZip(zipPath);

      return zipPath;
    } else {
      return this.baseLocation;
    }
  }

  async createFile(data: any): Promise<string> {
    const fileRoute = await this.setFile(this.filename, data);

    if (this.zip) {
      const { zip, zipPath } = this.createZip();

      zip.addLocalFile(fileRoute);
      zip.writeZip(zipPath);

      await fs.promises.unlink(fileRoute);

      return zipPath;
    } else {
      return fileRoute;
    }
  }

  private async setFile(filename: string, data: any): Promise<string> {
    this.validator.execute(data);

    const fileRoute = path.join(this.baseLocation, `${filename}.csv`);

    const content = this.createContent(data);

    await fs.promises.writeFile(fileRoute, content, "utf-8");

    return fileRoute;
  }
}
