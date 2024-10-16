import { ChacaUtils } from "../../../../../utils";
import { VariableName } from "../../../../core/names";

export class TableName extends VariableName {
  constructor(utils: ChacaUtils, name: string) {
    super(utils, { name: name });
  }
}

export class ObjectTableName extends TableName {
  constructor(utils: ChacaUtils, name: string) {
    super(utils, name);
  }
}

export class ArrayTableName extends TableName {
  constructor(utils: ChacaUtils, name: string) {
    super(utils, `${name}_array`);
  }
}

export class ColumnName extends VariableName {
  constructor(utils: ChacaUtils, name: string) {
    super(utils, { name: name });
  }
}
