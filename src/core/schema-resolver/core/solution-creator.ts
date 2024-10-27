import { SchemaResolver } from "..";
import { DatasetStore } from "../../dataset-store";
import { InputTreeNode } from "../../input-tree/core";
import { ChacaResultTree } from "../../result-tree";
import {
  ArrayResultNode,
  FieldNode,
  SingleResultNode,
} from "../../result-tree/classes";
import { SchemaStore } from "../../schema-store/store";

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

  execute({ field, indexDoc }: Props): FieldNode {
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
      const limit = field.getIsArray().execute({
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

      // no es un array
      else {
        const node = field.generate({
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
