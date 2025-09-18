import { SchemaResolver } from "../schema-resolver";
import { DatasetStore } from "../../dataset-store/dataset-store";
import { InputTreeNode } from "../../input-tree/core";
import { ChacaResultTree } from "../../result-tree/chaca-result-tree";
import { SchemaStore } from "../../schema-store/schema-store";
import { FieldNode } from "../../result-tree/classes/node/field-node";
import { ArrayResultNode } from "../../result-tree/classes/array";
import { SingleResultNode } from "../../result-tree/classes/single-result";

interface Props {
  field: InputTreeNode;
  indexDoc: number;
}

export class SolutionCreator {
  constructor(
    private readonly schemasStore: SchemaStore,
    private resultTree: ChacaResultTree,
    private readonly resolver: SchemaResolver,
  ) {}

  async execute({ field, indexDoc }: Props): Promise<FieldNode> {
    const currentDocument = this.resultTree.getDocumentByIndex(indexDoc);

    const store = new DatasetStore({
      schemasStore: this.schemasStore,
      omitCurrentDocument: currentDocument,
      omitResolver: this.resolver,
      caller: field.getFieldRoute(),
    });

    const isNull = field.isNull({
      store: store,
      currentDocument: currentDocument,
      index: indexDoc,
    });

    if (!isNull) {
      const limit = await field.getIsArray().execute({
        currentDocument: currentDocument,
        store: store,
      });

      // en caso de ser un array
      if (limit !== undefined) {
        const arrayNode = new ArrayResultNode({
          name: field.getName(),
          limit: limit,
        });

        return arrayNode;
      }

      // ifs not an array
      else {
        const node = await field.generate({
          currentDocument: currentDocument,
          indexDoc: indexDoc,
          schemaIndex: this.resolver.index,
          store: store,
        });

        return node;
      }
    } else {
      return new SingleResultNode({
        value: null,
        name: field.getName(),
      });
    }
  }
}
