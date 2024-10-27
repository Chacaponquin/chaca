import { SearchedRefValue } from "../input-tree/core/ref/interfaces/ref";
import { GetStoreValueConfig } from "../schema-store/interfaces/store";
import { DocumentTree, FieldNode } from "./classes";

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

  getAllRefValuesByNodeRoute(fieldTreeRoute: string[]): SearchedRefValue[] {
    const allValues: Array<SearchedRefValue> = [];

    this.documents.forEach((d) => {
      // quitar el primer elemento de la ruta pues pertenece al nombre del schema al que pertenece
      const foundValue = d.getRefValueByNodeRoute(fieldTreeRoute.slice(1));

      allValues.push({ resultNode: foundValue, document: d });
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
