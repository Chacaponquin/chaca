import {
  InputTreeNode,
  KeyValueNode,
  RefValueNode,
} from "../../../../../input-tree/core";
import { ChacaUtils } from "../../../../../utils";
import { ColumnName, TableName } from "./names";

interface Props {
  refs: RefValueNode[];
  nulls: InputTreeNode[];
  keys: KeyValueNode[];
}

export class TablesFixer {
  private readonly refs: RefValueNode[];
  private readonly nulls: InputTreeNode[];
  private readonly keys: KeyValueNode[];

  constructor(
    private readonly utils: ChacaUtils,
    { keys, nulls, refs }: Props,
  ) {
    this.keys = keys;
    this.refs = refs;
    this.nulls = nulls;
  }

  isKey(table: TableName, name: ColumnName): boolean {
    return this.keys.some((k) => {
      const n = new ColumnName(this.utils, k.getNodeName());
      const t = new TableName(this.utils, k.getParentName());

      return n.equal(name) && t.equal(table);
    });
  }

  isNull(table: TableName, name: ColumnName): boolean {
    return this.nulls.some((k) => {
      const n = new ColumnName(this.utils, k.getNodeName());
      const t = new TableName(this.utils, k.getParentName());

      return n.equal(name) && t.equal(table);
    });
  }
}
