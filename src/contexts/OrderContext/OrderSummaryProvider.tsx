import { useContext, useEffect, useState } from "react";
import OrderSummaryContext from "./OrderSummaryContext";
import { useDeliveryCalculator } from "@/hooks/useDeliveryCalculator";
import GeolocationContext from "../GeoLocationContext/GeolocationContext";
import LocaleContext from "../LocaleContext/LocaleContext";
import { CartContext } from "../CartContext/cartContext";
import { Order } from "@/types/Order";
import { addDecimals } from "@/utils/formatNumber";

interface OrderSummaryProviderProps {
  children: React.ReactNode;
}
export interface OrderSummaryContextValues {
  order: Order;
}

const OrderSummaryProvider: React.FC<OrderSummaryProviderProps> = ({
  children,
}) => {
  const { cartData } = useContext(CartContext);
  const { ISO_CURRENCY_CODE } = useContext(LocaleContext);

  const { subTotal: totalProductsPrice } = cartData;

  const [totalPrice, setTotalPrice] = useState({
    withoutDiscount: totalProductsPrice.withoutDiscount,
    withDiscount: totalProductsPrice.withDiscount,
  });

  const { STORE_LOCATION, coords } = useContext(GeolocationContext);

  const { PRETROL_PRICE } = useContext(LocaleContext);

  const { deliveryPrice } = useDeliveryCalculator({
    destinationCoordinates: STORE_LOCATION,
    userCoordinates: coords,
    petrolPrice: PRETROL_PRICE,
    carLitreConsumption: 15,
  });

  useEffect(() => {
    const deliveryApproved = cartData.totalItems >= 3;
    const deliveryPriceValue = deliveryApproved ? deliveryPrice : 0;

    const discountPrice = addDecimals(
      totalProductsPrice.withDiscount + deliveryPriceValue
    );
    const normalPrice = addDecimals(
      totalProductsPrice.withoutDiscount + deliveryPriceValue
    );
    setTotalPrice({
      withDiscount: discountPrice,
      withoutDiscount: normalPrice,
    });
  }, [deliveryPrice, cartData]);

  const cartItems = cartData.products.map((product) => {
    return {
      id: product.id,
      title: product.title,
      quantity: product.quantity,
      subTotal: product.subTotal,
      price: product.price,
    };
  });

  const values: OrderSummaryContextValues = {
    order: {
      total: totalPrice,
      subTotals: {
        totalItems: totalProductsPrice,
        delivery: deliveryPrice,
      },
      currency: ISO_CURRENCY_CODE,
      items: cartItems,
      quantity: cartData.totalItems,
    },
  };
  return (
    <OrderSummaryContext.Provider value={values}>
      {children}
    </OrderSummaryContext.Provider>
  );
};

export default OrderSummaryProvider;
