import { chaca } from "../../../../../../src";
import { CLIENT_SCHEMA } from "./client";
import { EMPLOYEE_SCHEMA } from "./employee";
import { ORDER_SCHEMA } from "./order";
import { ORDER_DETAIL_SCHEMA } from "./order-detail";
import { PAYMENT_SCHEMA } from "./payment";
import { PRODUCT_SCHEMA } from "./product";
import { PRODUCT_CATEGORY_SCHEMA } from "./product-category";
import { SHIPMENT_SCHEMA } from "./shipment";
import { SUPPORT_TICKET_SCHEMA } from "./support-ticket";
import { TRANSPORTER_SCHEMA } from "./transporter";
import { USER_SCHEMA } from "./user";

export const ECOMMERCE_DATASET = chaca.dataset([
  { documents: 10, schema: CLIENT_SCHEMA, name: "Client" },
  { documents: 10, name: "Employee", schema: EMPLOYEE_SCHEMA },
  { documents: 80, name: "OrderDeatil", schema: ORDER_DETAIL_SCHEMA },
  { documents: 30, name: "Order", schema: ORDER_SCHEMA },
  { documents: 6, name: "Payment", schema: PAYMENT_SCHEMA },
  { documents: 20, name: "ProductCategory", schema: PRODUCT_CATEGORY_SCHEMA },
  { documents: 300, name: "Product", schema: PRODUCT_SCHEMA },
  { documents: 20, name: "Shipment", schema: SHIPMENT_SCHEMA },
  { documents: 20, name: "SupportTicket", schema: SUPPORT_TICKET_SCHEMA },
  { documents: 30, name: "Transporter", schema: TRANSPORTER_SCHEMA },
  { documents: 50, name: "User", schema: USER_SCHEMA },
]);
