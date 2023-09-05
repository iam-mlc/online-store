import { Amount } from "./Amount";
import { Cart, ProductInCart } from "./Product";

export type Order = {
  total: TotalPrice;
  subTotals: SubTotals;
  currency: CurrencyCode;
  items: CartItems;
  quantity: TotalNumberOfItems;
};

type SubTotals = {
  totalItems: TotalItemsPrice;
  delivery: DeliveryPrice;
};

type TotalPrice = Amount;
type TotalItemsPrice = Amount;
type DeliveryPrice = number;
type CartItems = Omit<
  ProductInCart,
  | "description"
  | "rating"
  | "stock"
  | "brand"
  | "category"
  | "thumbnail"
  | "images"
  | "discountPercentage"
>[];
type TotalNumberOfItems = number;
type CurrencyCode = string;
