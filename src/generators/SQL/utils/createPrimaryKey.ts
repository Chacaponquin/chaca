import { PrivateUtils } from "../../../core/helpers/PrivateUtils.js";
import { SQLNode, SQLPrimaryKey, SQLString } from "../classes/index.js";

export function createPrimaryKeyNode(parentRoute: Array<string>): SQLNode {
  const primaryKeyRoute = [...parentRoute, `id_buenas`];
  const fieldType = createPrimaryKey();
  const primaryKeyNode = new SQLNode(primaryKeyRoute, fieldType);

  return primaryKeyNode;
}

export function createPrimaryKey() {
  const stringType = new SQLString(PrivateUtils.id());
  return new SQLPrimaryKey(stringType);
}
