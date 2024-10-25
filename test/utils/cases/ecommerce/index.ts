import { chaca } from "../../../../src";
import { CART } from "./schemas/cart";
import { CAR_ITEM } from "./schemas/cart-item";
import { CATEGORY } from "./schemas/category";
import { CREDENTIAL } from "./schemas/credentials";
import { ORDER } from "./schemas/order";
import { ORDER_LINE } from "./schemas/order-line";
import { PRODUCT } from "./schemas/product";
import { REVIEW } from "./schemas/reviews";
import { SOCIAL_PROFILE } from "./schemas/social-profile";
import { USER } from "./schemas/user";

export const ECOMMERCE_DATASET = chaca.dataset([
  { name: "CartItem", schema: CAR_ITEM, documents: 200 },
  { name: "Cart", schema: CART, documents: 50 },
  { name: "Category", schema: CATEGORY, documents: 110 },
  { name: "Credential", schema: CREDENTIAL, documents: 100 },
  { name: "OrderLine", schema: ORDER_LINE, documents: 50 },
  { name: "Product", schema: PRODUCT, documents: 300 },
  { name: "Review", schema: REVIEW, documents: 70 },
  { name: "SocialProfile", schema: SOCIAL_PROFILE, documents: 130 },
  { name: "User", schema: USER, documents: 300 },
  { name: "Order", schema: ORDER, documents: 140 },
]);
