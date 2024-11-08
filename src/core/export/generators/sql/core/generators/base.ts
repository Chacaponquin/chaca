import { ChacaUtils } from "../../../../../utils";
import { DeclarationOnly } from "../../../../core/declaration-only";
import { SkipInvalid } from "../../../../core/skip-invalid";
import { GenerateIds } from "../../value-object/generate-ids";
import { SQLTable } from "../table/table";
import { SQLTables } from "../table/tables";
import { TablesFixer } from "./fixer";
import { TableName } from "./names";
import { Route } from "./route";
import { DataValidator } from "./validator";
import { ValueCreator } from "./value-creator";

export abstract class SQLExtensionGenerator {
  abstract tables(tables: SQLTables): string;
  abstract values(tables: SQLTables): string;
}

interface BuildProps {
  name: string;
  data: any;
  tables: SQLTables;
  generateIds: boolean;
}

export class SQLDataGenerator {
  constructor(
    private readonly utils: ChacaUtils,
    private readonly generator: SQLExtensionGenerator,
    private readonly validator: DataValidator,
    private readonly fixer: TablesFixer,
    private readonly skipInvalid: SkipInvalid,
    private readonly declarationOnly: DeclarationOnly,
    private readonly generateIds: GenerateIds,
  ) {}

  build({ name: iname, data, tables }: BuildProps) {
    this.validator.execute(data);

    const route = new Route([iname]);
    const creator = new ValueCreator(
      this.utils,
      this.fixer,
      tables,
      this.skipInvalid,
      this.generateIds,
    );

    const table = new SQLTable(
      this.utils,
      new TableName(this.utils, route),
      false,
    );
    tables.add(table);

    // create data
    for (const value of data) {
      creator.execute({
        route: route,
        parent: table,
        value: value,
        current: null,
      });
    }
  }

  code(tables: SQLTables): string {
    this.fixer.fixTableNames(tables);
    this.fixer.fixColumnNames(tables);
    this.fixer.fixRefFields(tables);

    let code = ``;

    code += this.generator.tables(tables);

    if (!this.declarationOnly.value()) {
      code += this.generator.values(tables);
    }

    return code;
  }
}
