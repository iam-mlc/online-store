import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CheckoutForm from "@/components/Forms/CheckoutForm";
import GeolocationContext from "@/contexts/GeoLocationContext/GeolocationContext";
import LocaleContext from "@/contexts/LocaleContext/LocaleContext";
import OrderSummaryContext from "@/contexts/OrderContext/OrderSummaryContext";
import { Separator } from "@ariakit/react";
import Link from "next/link";
import { useContext } from "react";

interface ICheckoutProps {}
const pathway = [
  { label: "Cart", path: "/cart" },
  { label: "Checkout", path: "/checkout" },
];

const Checkout: React.FunctionComponent<ICheckoutProps> = ({}) => {
  const { order } = useContext(OrderSummaryContext);

  const { STORE_LOCATION, coords } = useContext(GeolocationContext);

  const { numberToCurrency } = useContext(LocaleContext);

  const productsSubTotal = numberToCurrency(
    order.subTotals.totalItems.withoutDiscount
  );
  const deliverySubTotal = numberToCurrency(
    order.quantity >= 3 ? order.subTotals.delivery : 0
  );

  const total = numberToCurrency(order.total.withoutDiscount);

  if (order.quantity === 0) {
    return (
      <main>
        <div className="p-8 w-full text-center flex flex-col gap-12 justify-center items-center">
          <h1 className="  text-xl md:text-3xl lg:text-5xl font-bold">
            You don't have any products in the cart yet. 🤔
          </h1>
          <Link
            href={"/products"}
            className="w-fit font-bold text-white  py-2 px-8 rounded-full inline-block bg-black/[.40] hover:bg-black/[.60] text-center "
          >
            Start Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main>
      <section>
        <div className="flex flex-col gap-4 ml-4">
          <Breadcrumb pathway={pathway} />
        </div>
      </section>
      <div className="flex md:flex-row flex-col-reverse md:py-16">
        <section className="lg:w-[50%] w-full py-20 md:py-0">
          <CheckoutForm />
        </section>
        <section className="lg:w-[50%] w-full h-full">
          <div className="md:fixed right-0 md:rounded-l-full md:rounded-br-none w-full md:w-[50%] p-8  md:p-12 bg-black/[.80] text-white  md:h-fit flex flex-col gap-2 justify-center">
            <div className="flex justify-between">
              <span className="opacity-40">Products</span>
              <span>{productsSubTotal}</span>
            </div>
            <div className="flex justify-between">
              <span className="opacity-40">Delivery</span>
              <span>{deliverySubTotal}</span>
            </div>
            <Separator className="bg-white w-full h-[0.20em] my-2" />
            <div className="flex justify-between font-bold text-xl">
              <span className="">TOTAL</span>
              <span>{total}</span>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Checkout;
