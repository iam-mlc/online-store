import { createContext } from "react";
import { OrderSummaryContextValues } from "./OrderSummaryProvider";

const OrderSummaryContext = createContext<OrderSummaryContextValues>(
  {} as OrderSummaryContextValues
);

export default OrderSummaryContext;
