import { NodeRoute } from "../input-tree/core/node/value-object/route";
import { SearchedRefValue } from "../input-tree/core/ref/interfaces/ref";
import { GetStoreValueConfig } from "../schema-store/interfaces/store";
import { DocumentTree, FieldNode } from "./classes";

interface GetRefValuesProps {
  caller: NodeRoute;
  search: NodeRoute;
}

export class ChacaResultTree<D = any> {
  constructor(readonly name: string) {}

  private documents: DocumentTree<D>[] = [];

  getDocumentByIndex(index: number): DocumentTree<D> {
    return this.documents[index];
  }

  insertDocument(document: DocumentTree<D>) {
    this.documents.push(document);
  }

  getAllValuesByNodeRoute(
    fieldTreeRoute: string[],
    config: GetStoreValueConfig,
  ): FieldNode[] {
    const whereFunction = config.where;

    let filterDocuemnts: DocumentTree<D>[];

    if (whereFunction) {
      filterDocuemnts = this.documents.filter((d) => {
        const isValid =
          d !== config.omitDocument && whereFunction(d.getDocumentObject());

        return isValid;
      });
    } else {
      filterDocuemnts = this.documents;
    }

    const allNodes = [] as FieldNode[];

    filterDocuemnts.forEach((d) => {
      const foundNode = d.getNodeByNodeRoute(fieldTreeRoute);
      allNodes.push(foundNode);
    });

    return allNodes;
  }

  getAllRefValuesByNodeRoute({
    search,
    caller,
  }: GetRefValuesProps): SearchedRefValue[] {
    const allValues: SearchedRefValue[] = [];

    this.documents.forEach((d) => {
      // quitar el primer elemento de la ruta pues pertenece al nombre del schema al que pertenece
      const found = d.getRefValueByNodeRoute({
        search: search.pop(),
        caller: caller,
      });

      allValues.push({ resultNode: found, document: d });
    });

    return allValues;
  }

  getDocumentsArray(): D[] {
    return this.documents.map((d) => d.getDocumentObject());
  }

  getDocuments(): DocumentTree<D>[] {
    return this.documents;
  }
}
