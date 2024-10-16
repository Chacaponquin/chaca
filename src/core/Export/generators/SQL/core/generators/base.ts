import { ChacaUtils } from "../../../../../utils";
import { ValueCreator } from "../sql-types";
import { SQLTable } from "../table/table";
import { SQLTables } from "../table/tables";
import { TablesFixer } from "./fixer";
import { ObjectTableName } from "./names";
import { DataValidator } from "./validator";

export abstract class SQLExtensionGenerator {
  abstract tables(tables: SQLTables): string;
  abstract values(tables: SQLTables): string;
}

interface BuildProps {
  name: string;
  data: any;
  tables: SQLTables;
}

export class SQLDataGenerator {
  constructor(
    private readonly utils: ChacaUtils,
    private readonly generator: SQLExtensionGenerator,
    private readonly validator: DataValidator,
    private readonly fixer: TablesFixer,
  ) {}

  build({ name: iname, data, tables }: BuildProps) {
    this.validator.execute(data);

    const name = new ObjectTableName(this.utils, iname);
    const creator = new ValueCreator(this.utils, this.fixer, tables);

    const table = new SQLTable(this.utils, name, false);

    // create data
    for (const value of data) {
      creator.execute({
        name: iname,
        parent: table,
        table: table,
        value: value,
      });
    }
  }

  code(tables: SQLTables): string {
    let code = ``;

    code += this.generator.tables(tables);

    code += "\n";

    code += this.generator.values(tables);

    return code;
  }
}
