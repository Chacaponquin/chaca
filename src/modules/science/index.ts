import { ChacaUtils } from "../../core/utils";
import {
  PERIODIC_TABLE_ELEMETNS,
  PERIODIC_TABLE_SYMBOLS,
} from "./constants/periodicTable";
import { UNITS } from "./constants/units";

export type PeriodicTableProps = {
  type?: "symbol" | "name";
};

export type UnitProps = {
  type?: "symbol" | "name";
};

export class ScienceModule {
  readonly constants = {
    units: UNITS,
    periodicTableElements: PERIODIC_TABLE_ELEMETNS,
    periodicTableSymbols: PERIODIC_TABLE_SYMBOLS,
  };

  /**
   * Returns periodic table element
   * @param args.type Element format. Can be (`'name'` | `'symbol'`). Defaults `'name'`
   * @example
   * modules.science.periodicTableElement() // 'Curium'
   * modules.science.periodicTableElement({ type: 'symbol' }) // 'Zn'
   * @returns string
   */
  periodicTableElement({ type = "name" }: PeriodicTableProps = {}): string {
    const utils = new ChacaUtils();

    if (type === "name") {
      return utils.oneOfArray(PERIODIC_TABLE_SYMBOLS);
    }

    return utils.oneOfArray(PERIODIC_TABLE_ELEMETNS);
  }

  /**
   * Returns a unit of measurement
   *
   * @param args.type Unit format. Can be (`'name'` | `'symbol'`). Defaults `'name'`
   *
   * @example
   * modules.science.unit() // 'hertz (Hz)'
   * modules.science.unit({ type: 'symbol' }) // 'N'
   * @returns string
   */
  unit({ type = "name" }: UnitProps = {}) {
    const utils = new ChacaUtils();

    if (type === "symbol") {
      return utils.oneOfArray(UNITS.map((el) => el.symbol));
    }

    return utils.oneOfArray(UNITS.map((el) => el.unit));
  }
}