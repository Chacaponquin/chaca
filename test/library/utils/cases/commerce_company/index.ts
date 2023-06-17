import { PACKAGE_TYPE } from "./constants";
import {
  CHARGE_PACKAGE_SCHEMA,
  CHARGE_PACKAGE_TYPE_SCHEMA,
  CHARGE_SCHEMA,
  CLIENT_SCHEMA,
  ENTERPRISE_CLIENT_SCHEMA,
  WAREHOUSE_SCHEMA,
} from "./schemas";

export const COMMERCE_COMPANY_SCHEMAS = [
  { name: "Package", schema: CHARGE_PACKAGE_SCHEMA, documents: 500 },
  { name: "Charge", schema: CHARGE_SCHEMA, documents: 130 },
  { name: "Warehouse", schema: WAREHOUSE_SCHEMA, documents: 10 },
  {
    name: "Package_Type",
    schema: CHARGE_PACKAGE_TYPE_SCHEMA,
    documents: PACKAGE_TYPE.length,
  },
  {
    name: "Client",
    schema: CLIENT_SCHEMA,
    documents: 60,
  },
  {
    name: "Client_Entepreise",
    schema: ENTERPRISE_CLIENT_SCHEMA,
    documents: 20,
  },
];
