import { RefFieldWhere } from "../ref-field";

export class Where {
  private readonly where: RefFieldWhere | null;

  constructor(value?: RefFieldWhere) {
    if (typeof value === "function") {
      this.where = value;
    } else {
      this.where = null;
    }
  }

  value() {
    return this.where;
  }
}
