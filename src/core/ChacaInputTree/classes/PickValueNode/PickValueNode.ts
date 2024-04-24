import {
  TryRefANoKeyFieldError,
  PickFieldDefinitionError,
} from "../../../../errors";
import { DataTypeSchema } from "../../../../schemas/dataType/DataTypeSchema";
import { PickFieldProps } from "../../../Fields/core/PickField/PickField";
import { ChacaTreeNodeConfig } from "../../interfaces/tree.interface";
import { ChacaTreeNode } from "../ChacaTreeNode/ChacaTreeNode";
import { Count, Values } from "./value-object";

export class PickValueNode extends ChacaTreeNode {
  private datatypeSchema = new DataTypeSchema();
  private values: PickFieldProps<unknown>;

  constructor(config: ChacaTreeNodeConfig, values: PickFieldProps<unknown>) {
    super(config);

    const route = this.getRouteString();

    this.values = {
      count: new Count(route, values.count).value,
      values: new Values(route, values.values).value,
    };

    if (this.values.count > this.values.values.length) {
      throw new PickFieldDefinitionError(route);
    }
  }

  public getNoArrayNode(): ChacaTreeNode {
    return new PickValueNode(
      { ...this.getNodeConfig(), isArray: null },
      this.values,
    );
  }

  public checkIfFieldExists(fieldTreeRoute: string[]): boolean {
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
    let num = this.datatypeSchema
      .int()
      .getValue({ min: 0, max: this.values.values.length });

    while (banned.includes(num)) {
      num = this.datatypeSchema
        .int()
        .getValue({ min: 0, max: this.values.values.length });
    }

    return num;
  }
}
