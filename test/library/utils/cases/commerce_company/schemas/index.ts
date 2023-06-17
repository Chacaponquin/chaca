import { DatasetStore, chaca, schemas } from "../../../../../../src";
import { PACKAGE_TYPE } from "../constants";

interface Warehouse {
  id: number;
  count_shelfs: number;
  count_rows: number;
  count_box: number;
}

interface Package {
  type: number;
  charge_id: number;
  shelf: number;
  row: number;
  box: number;
}

interface Charge {
  id: number;
  name: string;
  need_refrigeration: boolean;
  expire_date: Date;
  weight: number;
  client_id: number;
  warehouse_id: number;
}

const filterPachagesByCharge = (
  packages: Array<Package>,
  id: number,
  store: DatasetStore,
): Array<Package> => {
  return packages.filter((p) => {
    const packageCharge = store.getValue<Charge>("Charge", {
      where: (fields) => {
        return fields.id === p.charge_id;
      },
    })[0];

    return packageCharge.warehouse_id === id;
  });
};

const findCharge = (store: DatasetStore, charge_id: number) => {
  return store.getValue<Charge>("Charge", (fields) => {
    return fields.id === charge_id;
  })[0];
};

const findWarehouse = (store: DatasetStore, w_id: number) => {
  return store.getValue<Warehouse>("Warehouse", (wFields) => {
    return wFields.id === w_id;
  })[0];
};

export const CHARGE_PACKAGE_SCHEMA = chaca.defineSchema<Package>({
  id: chaca.key(chaca.sequence()),
  type: chaca.ref("Package_Type.id"),
  charge_id: chaca.ref("Charge.id"),
  shelf({ store, currentFields: packageFields }) {
    const foundCharge = findCharge(store, packageFields.charge_id);
    const foundWareHouse = findWarehouse(store, foundCharge.warehouse_id);

    let freeShelf: number | null = null;
    for (
      let currentShelf = 1;
      currentShelf <= foundWareHouse.count_shelfs && !freeShelf;
      currentShelf++
    ) {
      let sumTaken = 0;

      filterPachagesByCharge(
        store.getValue<Package>("Package"),
        foundCharge.warehouse_id,
        store,
      ).forEach((p) => {
        if (p.shelf === currentShelf) {
          sumTaken += 1;
        }
      });

      if (sumTaken < foundWareHouse.count_rows * foundWareHouse.count_box) {
        freeShelf = currentShelf;
      }
    }

    return freeShelf;
  },

  row({ currentFields: packageFields, store }) {
    const foundCharge = findCharge(store, packageFields.charge_id);
    const foundWareHouse = findWarehouse(store, foundCharge.warehouse_id);

    let freeRow: number | null = null;
    for (
      let currentRow = 1;
      currentRow <= foundWareHouse.count_rows && !freeRow;
      currentRow++
    ) {
      let sumTaken = 0;

      filterPachagesByCharge(
        store.getValue<Package>("Package"),
        foundCharge.warehouse_id,
        store,
      ).forEach((p) => {
        if (p.shelf === packageFields.shelf && currentRow === p.row) {
          sumTaken += 1;
        }
      });

      if (sumTaken < foundWareHouse.count_box) {
        freeRow = currentRow;
      }
    }

    return freeRow;
  },

  box({ currentFields: packageFields, store }) {
    const foundCharge = findCharge(store, packageFields.charge_id);

    const filterPackages = filterPachagesByCharge(
      store.getValue<Package>("Package"),
      foundCharge.warehouse_id,
      store,
    ).filter(
      (p) => p.shelf === packageFields.shelf && p.row === packageFields.row,
    );

    if (filterPackages.length) {
      let freeBox: number = filterPackages[filterPackages.length - 1].box + 1;
      return freeBox;
    } else {
      return 1;
    }
  },
});

export const CHARGE_SCHEMA = chaca.defineSchema({
  id: chaca.key(chaca.sequence()),
  name: schemas.word.noun(),
  need_refrigeration: schemas.dataType.boolean(),
  expire_date: { type: schemas.date.future(), posibleNull: true },
  weight: schemas.dataType.int({ min: 40, max: 1000 }),
  client_id: chaca.ref("Client.id"),
  warehouse_id: chaca.ref("Warehouse.id", {
    where: ({ currentFields, store }) => {
      const findChargesWithSameWarehouse = store
        .getValue<Charge>("Charge")
        .filter((charge) => {
          return charge.warehouse_id === currentFields.warehouse_id;
        });

      const foundWareHouse = store.getValue<Warehouse>("Warehouse", {
        where: (wFields) => {
          return wFields.id === currentFields.warehouse_id;
        },
      })[0];

      if (foundWareHouse) {
        const totalCapacity =
          foundWareHouse.count_shelfs *
          foundWareHouse.count_rows *
          foundWareHouse.count_box;

        let takedCapacity = 0;
        findChargesWithSameWarehouse.forEach((charge) => {
          takedCapacity += store.getValue<Package>("Package", {
            where: (fields) => fields.charge_id === charge.id,
          }).length;
        });

        return takedCapacity < totalCapacity;
      } else {
        return true;
      }
    },
  }),
});

export const WAREHOUSE_SCHEMA = chaca.defineSchema({
  id: chaca.key(chaca.sequence()),
  count_shelfs: schemas.dataType.int({ min: 1, max: 10 }),
  count_rows: schemas.dataType.int({ min: 5, max: 15 }),
  count_box: schemas.dataType.int({ min: 5, max: 10 }),
});

export const CHARGE_PACKAGE_TYPE_SCHEMA = chaca.defineSchema({
  id: chaca.key(chaca.sequence()),
  name: chaca.sequential(PACKAGE_TYPE),
});

export const CLIENT_SCHEMA = chaca.defineSchema({
  id: chaca.key(chaca.sequence()),
  country: schemas.address.country(),
  phone: schemas.phone.number(),
  fax: schemas.phone.number(),
  email: schemas.internet.email(),
  name: ({ currentFields }) => {
    if (currentFields.type === "E") {
      return schemas.word.noun().getValue() + " S.A.";
    } else {
      return schemas.person.fullName().getValue();
    }
  },
  is_priority: schemas.dataType.boolean(),
  type: chaca.enum(["E", "P"]),
  init_services_date: schemas.date.past(),
});

export const ENTERPRISE_CLIENT_SCHEMA = chaca.defineSchema({
  client_id: chaca.key(
    chaca.ref("Client.id", {
      unique: true,
      where: ({ refFields }) => {
        return refFields.type === "E";
      },
    }),
  ),
  enterprise_type: chaca.enum(["Aerea", "Navirea"]),
  security_level: chaca.enum([
    "Mercancia fragil",
    "Mercancia no fragil",
    "Empacada al vacio",
    "Prensada",
  ]),
  alternative_priority: chaca.enum(["Envio Urgente", "Economico"]),
  condition: chaca.enum([
    "Bajas temperaturas",
    "Ambiente seco",
    "Ambiente humedo",
    "SIn iluminacion",
  ]),
});
