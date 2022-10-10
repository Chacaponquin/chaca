import { faker } from '@faker-js/faker';
import { SchemaField } from '../../utils/SchemaField';

export class VehicleSchema {
  bicycle() {
    return new SchemaField<string>('bicycle', faker.vehicle.bicycle, {});
  }

  manufacturer() {
    return new SchemaField<string>(
      'manufacturer',
      faker.vehicle.manufacturer,
      {},
    );
  }

  model() {
    return new SchemaField<string>('model', faker.vehicle.model, {});
  }

  type() {
    return new SchemaField<string>('type', faker.vehicle.type, {});
  }

  vehicle() {
    return new SchemaField<string>('vehicle', faker.vehicle.vehicle, {});
  }

  vehicleIdentification() {
    return new SchemaField<string>(
      'vehicleIdentification',
      faker.vehicle.vin,
      {},
    );
  }
}
