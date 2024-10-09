import { SchemaStore } from "../schema-store/store";
import { DocumentTree } from "../result-tree/classes/DocumentTree";
import { GetStoreConfig } from "../schema-store/interfaces/store";
import { FieldNode } from "../result-tree/classes";
import { SchemaResolver } from "../schema-resolver";
import { GetConfig } from "./value-object";

interface Props {
  schemasStore: SchemaStore;
  omitCurrentDocument: DocumentTree<any>;
  omitResolver: SchemaResolver;
}

/** Store to interact with all datasets */
export class DatasetStore {
  private readonly schemasStore: SchemaStore;
  private readonly omitCurrentDocument: DocumentTree<any>;
  private readonly omitResolver: SchemaResolver;

  constructor({ omitCurrentDocument, omitResolver, schemasStore }: Props) {
    this.omitResolver = omitResolver;
    this.omitCurrentDocument = omitCurrentDocument;
    this.schemasStore = schemasStore;
  }

  get<R = any>(route: string, iconfig?: GetStoreConfig): R[] {
    const config = new GetConfig({
      omitCurrentDocument: this.omitCurrentDocument,
      omitResolver: this.omitResolver,
      config: iconfig,
    });

    const foundNodes = this.schemasStore.value(route, config.value());

    const returnValues = [] as R[];

    for (const node of foundNodes) {
      if (node instanceof FieldNode) {
        returnValues.push(node.getRealValue() as R);
      } else {
        returnValues.push(node.getDocumentObject());
      }
    }

    return returnValues;
  }

  currentDocuments<R = any>(): R[] {
    return this.omitResolver.getDocumentsArray(this.omitCurrentDocument);
  }
}
