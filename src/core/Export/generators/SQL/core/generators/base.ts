import {
  InputTreeNode,
  KeyValueNode,
  RefValueNode,
} from "../../../../../input-tree/core";
import { ChacaUtils } from "../../../../../utils";
import { VariableName } from "../../../../core/names";
import { Parent } from "../../../../core/parent";
import { SpaceIndex } from "../../../../core/space-index";
import { SQLDatatype } from "../sql-types";
import { SQLTables } from "../table/tables";
import { Searcher } from "./searcher";
import { DataValidator } from "./validator";

export abstract class SQLExtensionGenerator {
  abstract tables(tables: SQLTables): string;
  abstract values(tables: SQLTables): string;
}

interface BuildProps {
  name: string;
  data: any;
  tables: SQLTables;
  config: {
    keys: KeyValueNode[];
    refs: RefValueNode[];
    nulls: InputTreeNode[];
  };
}

export class SQLDataGenerator {
  constructor(
    private readonly utils: ChacaUtils,
    private readonly generator: SQLExtensionGenerator,
    private readonly validator: DataValidator,
  ) {}

  build({ name: iname, data, tables, config }: BuildProps) {
    const searcher = new Searcher(tables);

    this.validator.execute(data);

    const name = new VariableName(this.utils, { name: iname });
    const parent = new Parent();
    const index = new SpaceIndex(3);

    // create data
    for (const value of data) {
      SQLDatatype.create(this.utils, name, parent, index, tables, value);
    }

    // set key fields
    for (const key of config.keys) {
      searcher.column({
        search: { table: iname, column: key.getNodeName() },
        action(column) {
          column.setIsKey(true);
        },
      });
    }

    // set null fields
    for (const field of config.nulls) {
      searcher.column({
        search: { table: iname, column: field.getNodeName() },
        action(column) {
          column.setIsNull(true);
        },
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
