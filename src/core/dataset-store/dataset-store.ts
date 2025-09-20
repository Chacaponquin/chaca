import { SchemaStore } from "../schema-store/schema-store";
import { DocumentTree } from "../result-tree/classes/document/document-tree";
import { GetStoreConfig } from "../schema-store/interfaces/schema-store";
import { SchemaResolver } from "../schema-resolver/schema-resolver";
import { GetConfig } from "./value-object";
import { NodeRoute } from "../input-tree/core/node/value-object/route";
import { FieldNode } from "../result-tree/classes/node/field-node";

interface Props {
  schemasStore: SchemaStore;
  omitCurrentDocument: DocumentTree;
  omitResolver: SchemaResolver;
  caller: NodeRoute;
}

/** Store to interact with all datasets */
export class DatasetStore {
  private readonly schemasStore: SchemaStore;
  private readonly omitCurrentDocument: DocumentTree<any>;
  private readonly omitResolver: SchemaResolver;
  private readonly caller: NodeRoute;

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

  /**
   * Allows you to access values from a schema from anywhere in the dataset
   *
   * @param route Value route to access
   * @param config.where Function to filter schema documents
   *
   * @example
   * store.get("User") // user schema documents
   * store.get("User.id") // user ids
   * store.get("User.id", {
   *   where: (fields) => {
   *      return fields.age > 40
   *   }
   * })
   */
  async get<R = any>(route: string, iconfig?: GetStoreConfig): Promise<R[]> {
    const config = new GetConfig({
      omitCurrentDocument: this.omitCurrentDocument,
      omitResolver: this.omitResolver,
      config: iconfig,
    });

    const foundNodes = await this.schemasStore.value({
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

  /**
   * Returns the documents of the schema that uses this method
   */
  currentDocuments<R = any>(): R[] {
    return this.omitResolver.getDocumentsArray(this.omitCurrentDocument);
  }
}
