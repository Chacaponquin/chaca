import { TryRefANoKeyFieldError } from "../../../../errors";
import { DatasetStore } from "../../../dataset-store/dataset-store";
import { GenerateProps, InputTreeNode } from "../node/input-tree-node";
import { IsArray, NotArray } from "../is-array/is-array";
import { ChancesArray } from "./value-object/chances-array";
import { NodeRoute } from "../node/value-object/route";
import { PossibleNull } from "../possible-null/possible-null";
import { DocumentTree } from "../../../result-tree/classes/document/document-tree";
import { FieldNode } from "../../../result-tree/classes/node/field-node";
import { SingleResultNode } from "../../../result-tree/classes/single-result";

interface Props {
  store: DatasetStore;
  currentDocument: DocumentTree;
}

export class ProbabilityValueNode extends InputTreeNode {
  private options: ChancesArray;

  constructor(
    route: NodeRoute,
    isArray: IsArray,
    possibleNull: PossibleNull,
    options: ChancesArray,
  ) {
    super(route, isArray, possibleNull);

    this.options = options;
  }

  getNoArrayNode(): InputTreeNode {
    return new ProbabilityValueNode(
      this.route,
      new NotArray(),
      this.possibleNull,
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

  generate(props: GenerateProps): Promise<FieldNode> {
    const result = new SingleResultNode({
      name: this.getName(),
      value: this.value(props),
    });

    return new Promise((resolve) => resolve(result));
  }
}
