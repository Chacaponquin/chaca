import {
  TryRefANoKeyFieldError,
  PickFieldDefinitionError,
} from "../../../../errors";
import { DatatypeModule } from "../../../../modules/datatype";
import { PickFieldProps } from "../../../fields/core/pick";
import { FieldIsArray } from "../../../schema/value-object";
import { ChacaTreeNodeConfig } from "../../interfaces/tree";
import { ChacaTreeNode } from "../node";
import { Count, Values } from "./value-object";

export class PickValueNode extends ChacaTreeNode {
  private datatypeModule = new DatatypeModule();
  private values: PickFieldProps;

  constructor(config: ChacaTreeNodeConfig, ivalues: PickFieldProps) {
    super(config);

    const route = this.getRouteString();

    const count = new Count(route, ivalues.count);
    const values = new Values(route, ivalues.values);

    this.values = {
      count: count.value,
      values: values.value,
    };

    if (this.values.count > this.values.values.length) {
      throw new PickFieldDefinitionError(route);
    }
  }

  getNoArrayNode(): ChacaTreeNode {
    return new PickValueNode(
      { ...this.getNodeConfig(), isArray: new FieldIsArray() },
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

  getValues(): unknown[] {
    const result: unknown[] = [];
    const banned: number[] = [];

    if (this.values.count === this.values.values.length) {
      return this.values.values;
    } else {
      let i = 0;

      while (i < this.values.count) {
        const index = this.generate(banned);

        banned.push(index);
        result.push(this.values.values[index]);

        i++;
      }

      return result;
    }
  }

  private generate(banned: number[]): number {
    let num = this.datatypeModule.int({
      min: 0,
      max: this.values.values.length,
    });

    while (banned.includes(num)) {
      num = this.datatypeModule.int({ min: 0, max: this.values.values.length });
    }

    return num;
  }
}
