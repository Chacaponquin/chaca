import { ChacaUtils } from "../../core/utils";
import { PERIODIC_TABLE_ELEMENTS } from "./constants/periodic-table";
import { UNITS } from "./constants/units";

export type PeriodicTableProps = {
  type?: "symbol" | "name";
};

export type UnitProps = {
  type?: "symbol" | "name";
};

export class ScienceModule {
  constructor(private readonly utils: ChacaUtils) {}

  readonly constants = {
    units: UNITS,
    periodicTableElements: PERIODIC_TABLE_ELEMENTS,
  };

  /**
   * Returns periodic table element
   * @param args.type Element format. Can be (`'name'` | `'symbol'`). Defaults `'name'`
   *
   * @example
   * modules.science.periodicTableElement() // 'Curium'
   * modules.science.periodicTableElement({ type: 'symbol' }) // 'Zn'
   *
   * @returns string
   */
  periodicTableElement({ type = "name" }: PeriodicTableProps = {}): string {
    if (type === "name") {
      return this.utils.oneOfArray(
        this.constants.periodicTableElements.map((e) => e.name),
      );
    }

    return this.utils.oneOfArray(
      this.constants.periodicTableElements.map((e) => e.symbol),
    );
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
    if (type === "symbol") {
      return this.utils.oneOfArray(UNITS.map((el) => el.symbol));
    }

    return this.utils.oneOfArray(UNITS.map((el) => el.unit));
  }
}
