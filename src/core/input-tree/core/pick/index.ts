import { TryRefANoKeyFieldError } from "../../../../errors";
import { DatatypeModule } from "../../../../modules/datatype";
import { DatasetStore } from "../../../dataset-store";
import { DocumentTree } from "../../../result-tree/classes";
import { ChacaTreeNodeConfig } from "../../interfaces/tree";
import { NotArray } from "../is-array";
import { InputTreeNode } from "../node";
import { Count } from "./value-object/count";
import { Values } from "./value-object/values";

interface GetValuesProps {
  currentDocument: DocumentTree;
  store: DatasetStore;
}

export class PickValueNode extends InputTreeNode {
  constructor(
    private readonly datatypeModule: DatatypeModule,
    config: ChacaTreeNodeConfig,
    private readonly count: Count,
    private readonly values: Values,
  ) {
    super(config);
  }

  getNoArrayNode(): InputTreeNode {
    return new PickValueNode(
      this.datatypeModule,
      { ...this.getNodeConfig(), isArray: new NotArray() },
      this.count,
      this.values,
    );
  }

  checkIfFieldExists(fieldTreeRoute: string[]): boolean {
    if (fieldTreeRoute.length === 0) {
      throw new TryRefANoKeyFieldError(this.getRouteString());
    } else {
      return false;
    }
  }

  getValues({ currentDocument, store }: GetValuesProps): unknown[] {
    const result: unknown[] = [];
    const banned: number[] = [];

    const limit = this.count.limit({
      store: store,
      currentDocument: currentDocument,
    });

    if (limit === this.values.length()) {
      return this.values.values();
    } else {
      let i = 0;

      while (i < limit) {
        const index = this.generate(banned);

        banned.push(index);
        result.push(this.values.get(index));

        i++;
      }

      return result;
    }
  }

  private generate(banned: number[]): number {
    let num = this.datatypeModule.int({
      min: 0,
      max: this.values.length(),
    });

    while (banned.includes(num)) {
      num = this.datatypeModule.int({ min: 0, max: this.values.length() });
    }

    return num;
  }
}
