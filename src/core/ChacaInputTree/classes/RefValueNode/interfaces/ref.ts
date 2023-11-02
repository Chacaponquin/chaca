import { DocumentTree } from "../../../../ChacaResultTree/classes/DocumentTree/DocumentTree";
import { SingleResultNode } from "../../../../ChacaResultTree/classes/SingleResultNode/SingleResultNode";

export interface SearchedRefValue {
  document: DocumentTree<any>;
  resultNode: SingleResultNode;
}
