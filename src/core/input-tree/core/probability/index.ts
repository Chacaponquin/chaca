import { TryRefANoKeyFieldError } from "../../../../errors";
import {
  DocumentTree,
  FieldNode,
  SingleResultNode,
} from "../../../result-tree/classes";
import { DatasetStore } from "../../../dataset-store";
import { ChacaTreeNodeConfig } from "../../interfaces/tree";
import { GenerateProps, InputTreeNode } from "../node";
import { NotArray } from "../is-array";
import { ChancesArray } from "./value-object/chances-array";

interface Props {
  store: DatasetStore;
  currentDocument: DocumentTree;
}

export class ProbabilityValueNode extends InputTreeNode {
  private options: ChancesArray;

  constructor(config: ChacaTreeNodeConfig, options: ChancesArray) {
    super(config);

    this.options = options;
  }

  getNoArrayNode(): InputTreeNode {
    return new ProbabilityValueNode(
      { ...this.getNodeConfig(), isArray: new NotArray() },
      this.options,
    );
  }

  checkIfFieldExists(fieldTreeRoute: string[]): boolean {
    if (fieldTreeRoute.length === 0) {
      throw new TryRefANoKeyFieldError(this.getRouteString());
    } else {
      return false;
    }
  }

  private value(props: Props) {
    return this.options.value(props);
  }

  generate(props: GenerateProps): FieldNode {
    return new SingleResultNode({
      name: this.getNodeName(),
      value: this.value(props),
    });
  }
}
