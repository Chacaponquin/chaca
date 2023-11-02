import { ChacaUtils } from "../../core/ChacaUtils/ChacaUtils";
import { SchemaField } from "../SchemaField";
import { BICYCLE, FUEL, MANUFACTURER, MODEL, TYPE } from "./constants";

export class VehicleSchema {
  private utils = new ChacaUtils();

  public readonly constants = {
    bicycles: BICYCLE,
    fuels: FUEL,
    manufacturers: MANUFACTURER,
    models: MODEL,
    vehicleTypes: TYPE,
  };

  /**
   * Returns a bicycle type
   * @example schemas.vehicle.bicycle() // Schema
   * @example schemas.vehicle.bicycle().getValue() // 'BMX Bicycle'
   * @returns string
   */
  bicycle() {
    return new SchemaField<string>(() => this.utils.oneOfArray(BICYCLE));
  }

  /**
   * Returns a manufacturer name
   * @example schemas.vehicle.manufacturer() // Schema
   * @example schemas.vehicle.manufacturer().getValue() // 'BMW'
   * @returns string
   */
  manufacturer() {
    return new SchemaField<string>(() => this.utils.oneOfArray(MANUFACTURER));
  }

  /**
   * Returns a vehicle model name
   * @example schemas.vehicle.vehicleModel() // Schema
   * @example schemas.vehicle.vehicleModel().getValue() // 'Model S'
   * @returns string
   */
  vehicleModel() {
    return new SchemaField<string>(() => this.utils.oneOfArray(MODEL));
  }

  /**
   * Returns a vehicle type
   * @example schemas.vehicle.vehicleType() // Schema
   * @example schemas.vehicle.vehicleType().getValue() // 'Coupe'
   * @returns string
   */
  vehicleType() {
    return new SchemaField<string>(() => this.utils.oneOfArray(TYPE));
  }

  /**
   * Returns a vehicle name
   * @example schemas.vehicle.vehicle() // Schema
   * @example schemas.vehicle.vehicle().getValue() // 'BMW Explorer'
   * @returns string
   */
  vehicle() {
    return new SchemaField<string>(
      () =>
        `${this.manufacturer().getValue()} ${this.vehicleModel().getValue()}`,
    );
  }

  /**
   * Returns a fuel type
   * @example schemas.vehicle.fuel() // Schema
   * @example schemas.vehicle.fuel().getValue() // 'Diesel'
   * @returns string
   */
  fuel() {
    return new SchemaField<string>(() => this.utils.oneOfArray(FUEL));
  }
}
