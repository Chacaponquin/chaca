import { CHDataUtils } from "../../utils/CHDataUtils";
import { SchemaField } from "../SchemaField";
import {
  PERIODIC_TABLE_ELEMETNS,
  PERIODIC_TABLE_SYMBOLS,
} from "./constants/periodicTable";
import { UNITS } from "./constants/units";

type PeriodicTableProps = {
  type?: "symbol" | "name";
};

type UnitProps = {
  type?: "symbol" | "name";
};

export class ScienceSchema {
  periodicTableElement(args?: PeriodicTableProps) {
    return new SchemaField<string, PeriodicTableProps>(
      "periodicTableElement",
      (a) => {
        if (a.type && typeof a.type === "string") {
          if (a.type === "name") {
            return CHDataUtils.oneOfArray(PERIODIC_TABLE_SYMBOLS);
          } else return CHDataUtils.oneOfArray(PERIODIC_TABLE_ELEMETNS);
        } else return CHDataUtils.oneOfArray(PERIODIC_TABLE_ELEMETNS);
      },
      args || {},
    );
  }

  unit(args?: UnitProps) {
    return new SchemaField<string, UnitProps>(
      "unit",
      (a) => {
        if (a.type && typeof a.type === "string") {
          if (a.type === "symbol") {
            return CHDataUtils.oneOfArray(UNITS.map((el) => el.symbol));
          } else return CHDataUtils.oneOfArray(UNITS.map((el) => el.key));
        } else return CHDataUtils.oneOfArray(UNITS.map((el) => el.key));
      },
      args || {},
    );
  }
}
