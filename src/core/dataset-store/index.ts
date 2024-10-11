import { SchemaStore } from "../schema-store/store";
import { DocumentTree } from "../result-tree/classes/DocumentTree";
import { GetStoreConfig } from "../schema-store/interfaces/store";
import { FieldNode } from "../result-tree/classes";
import { SchemaResolver } from "../schema-resolver";
import { GetConfig } from "./value-object";

interface Props {
  schemasStore: SchemaStore;
  omitCurrentDocument: DocumentTree;
  omitResolver: SchemaResolver;
  caller: string;
}

/** Store to interact with all datasets */
export class DatasetStore {
  private readonly schemasStore: SchemaStore;
  private readonly omitCurrentDocument: DocumentTree<any>;
  private readonly omitResolver: SchemaResolver;
  private readonly caller: string;

  constructor({
    omitCurrentDocument,
    omitResolver,
    schemasStore,
    caller,
  }: Props) {
    this.omitResolver = omitResolver;
    this.omitCurrentDocument = omitCurrentDocument;
    this.schemasStore = schemasStore;
    this.caller = caller;
  }

  get<R = any>(route: string, iconfig?: GetStoreConfig): R[] {
    const config = new GetConfig({
      omitCurrentDocument: this.omitCurrentDocument,
      omitResolver: this.omitResolver,
      config: iconfig,
    });

    const foundNodes = this.schemasStore.value({
      route: route,
      config: config.value(),
      caller: this.caller,
    });

    const values = [] as R[];

    for (const node of foundNodes) {
      if (node instanceof FieldNode) {
        values.push(node.getRealValue() as R);
      } else {
        values.push(node.getDocumentObject());
      }
    }

    return values;
  }

  currentDocuments<R = any>(): R[] {
    return this.omitResolver.getDocumentsArray(this.omitCurrentDocument);
  }
}
