import { DocumentTree } from "../../../../ChacaResultTree/classes/DocumentTree/DocumentTree.js";
import { SingleResultNode } from "../../../../ChacaResultTree/classes/SingleResultNode/SingleResultNode.js";

export interface SearchedRefValue {
  document: DocumentTree<any>;
  resultNode: SingleResultNode;
}
