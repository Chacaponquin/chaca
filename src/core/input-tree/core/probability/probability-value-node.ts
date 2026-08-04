import { TryRefANoKeyFieldError } from "../../../../errors";
import { DatasetStore } from "../../../dataset-store/dataset-store";
import { GenerateProps, InputTreeNode } from "../node/input-tree-node";
import { IsArray, NotArray } from "../is-array/is-array";
import { ChancesArray } from "./value-object/chances-array";
import { NodeRoute } from "../node/value-object/route";
import { NotNull, PossibleNull } from "../possible-null/possible-null";
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

  /**
   * Los elementos de un array no son campos, por lo que no llevan la
   * configuracion de nulos del campo: `possibleNull` decide si el valor del
   * campo es un array o `null`, no si cada elemento lo es.
   */
  getNoArrayNode(): InputTreeNode {
    return new ProbabilityValueNode(
      this.route,
      new NotArray(),
      new NotNull(),
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

  private value(props: Props): Promise<unknown> {
    return this.options.value(props);
  }

  async generate(props: GenerateProps): Promise<FieldNode> {
    const result = new SingleResultNode({
      name: this.getName(),
      value: await this.value(props),
    });

    return result;
  }
}
