import { DocumentTree } from "../../../../result-tree/classes/document";
import { SingleResultNode } from "../../../../result-tree/classes/single-result";

export interface SearchedRefValue {
  document: DocumentTree<any>;
  resultNode: SingleResultNode;
}
