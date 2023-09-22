import Table from "../Table/Table";
import { CartContext } from "@/contexts/CartContext/cartContext";
import { tables } from "../Table/helpers/table";
import { useContext } from "react";
import Link from "next/link";
import { CartContextValues } from "@/contexts/CartContext/CartProvider";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Close } from "../Icons";
import dynamic from "next/dynamic";
import LocaleContext from "@/contexts/LocaleContext/LocaleContext";
import { ListItems } from "@/types/ListItem";
import { ConfigItems } from "@/types/ConfigItems";
import toCamelCase from "@/utils/toCamelCase";
import ProductTitle from "./ProductTitle";
import DeleteButton from "./DeleteButton";

const Dialog = dynamic(() => import("../Dialog/Dialog"), { ssr: false });

interface ICartProps {}

const Cart: React.FunctionComponent<ICartProps> = ({}) => {
  const { cartData } = useContext(CartContext) as CartContextValues;
  const { numberToCurrency } = useContext(LocaleContext);
  const { subTotal, products } = cartData;

  const tableItems = tables({
    data: cartData.products,
    itemNumber: 0,
  });

  const headValues = ["Product", "Qty", "Price", "Remove"];
  const footerValues = [
    "",
    "Sub-total",
    "",
    `${numberToCurrency(subTotal.withoutDiscount)}`,
  ];

  const headContent: ListItems = headValues.map((item, index) => {
    return {
      label: toCamelCase(item),
      component: (
        <>
          <span>{item}</span>
        </>
      ),
    };
  });

  const bodyContent: ConfigItems = products.map((product) => {
    return {
      label: product.title,
      config: {
        product: {
          label: toCamelCase(product.title),
          component: <ProductTitle data={product} />,
        },
        qty: {
          label: "Quantity",
          component: (
            <>
              <span>{product.quantity}</span>
            </>
          ),
        },
        price: {
          label: "Price",
          component: (
            <>
              <span>{numberToCurrency(product.price)}</span>
            </>
          ),
        },
        remove: {
          label: "Remove",
          component: <DeleteButton data={product} />,
        },
      },
    };
  });

  const footerContent: ListItems = footerValues.map((item, index) => {
    return {
      label: "subTotal",
      component: (
        <>
          <span className="font-bold sm:text-base md:text-2xl">{item}</span>
        </>
      ),
    };
  });

  const tableContent = {
    head: headContent,
    body: bodyContent,
    // footer: footerContent,
  };

  if (cartData.totalItems === 0) {
    return (
      <div className="p-8 w-full text-center flex flex-col gap-12 justify-center items-center mt-20 mb-60">
        <h1 className="text-xl md:text-3xl lg:text-5xl font-bold">
          You don't have any products in the cart yet. 🤔
        </h1>
        <Link
          href={"/products"}
          className="w-fit font-bold text-white  py-2 px-8 rounded-full inline-block bg-black/[.40] hover:bg-black/[.60] text-center "
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 md:p-4 w-fit  justify-center items-center my-28">
      <h1 className="text-2xl font-bold">Your Cart</h1>
      <Table
        config={tableContent}
        tableClassName=""
        tableDataClassName="text-center lg:p-4 p-2 sm:text-[0.8em] md:text-base"
        tableHeadClassName="border-b-2 border-black/[.20] md:p-4 p-2 sm:text-[0.8em] md:text-base"
        tableRowClassName="border-b-2 border-black/[.08] hover:bg-black/[0.08] "
        bodyClassName=""
        headClassName=""
        footerClassName="border-y-2 border-black/[.50] "
        colClassName="md:data-[name=price]:block sm:data-[name=price]:collapse"
      />
      <div className="flex md:flex-row flex-col w-full justify-center items-center gap-4  md:justify-between md:gap-0 font-bold sm:text-base md:text-2xl ">
        <span className="">Sub-Total: </span>
        <span className="">{numberToCurrency(subTotal.withoutDiscount)}</span>
      </div>
      <CartButtons />
    </div>
  );
};

const CartButtons = ({}) => {
  const { resetCart } = useContext(CartContext);

  const dialog = {
    trigger: {
      label: "Reset Cart",
      component: <span className="underline under">Reset Cart</span>,
    },
    content: {
      label: "",
      component: (
        <>
          <div className="flex md:gap-16 gap-4 md:flex-row flex-col ">
            <DialogPrimitive.Close
              className="font-bold text-white py-2 px-8  rounded-full inline-block bg-black/[.40] hover:bg-black/[.60] text-center"
              onClick={(e) => {
                e.stopPropagation;
                resetCart();
              }}
            >
              Reset
            </DialogPrimitive.Close>
            <DialogPrimitive.Close className="font-bold py-2 px-8 rounded-full inline-block border-2 border-black/[.40] hover:bg-black/[.60] hover:text-white text-center">
              <span>Cancel</span>
            </DialogPrimitive.Close>
          </div>
        </>
      ),
    },
  };

  return (
    <div className="flex gap-6 sm:flex-col md:flex-row mt-10">
      <Dialog
        items={dialog}
        contentClassName="fixed w-[80vw] md:w-fit md:h-fit h-[50vh] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white rounded-[1.5em] flex flex-col bg-white z-[9999] items-center justify-center gap-10  md:p-16 p-8"
        overlayClassName="fixed inset-0 w-screen h-screen bg-black/[.50] backdrop-blur-md z-[9999]"
        triggerClassName="underline"
        dialogTitle="Reset Cart ?"
        titleClassName="font-bold"
        dialogDescription="Are you sure you want to reset your cart ?"
        descriptionClassName="text-[0.8em] md:text-base text-center md:text-left"
        closeClassName="absolute top-4 right-4 z-[9999] cursor-pointer w-[2em] h-auto "
        customCloseElement={
          <Close className="stroke-black opacity-60 rounded-full p-2 hover:bg-black/[.20] bg-white/[.80]" />
        }
      />
      <Link
        href={`/products`}
        className="font-bold py-2 px-8 rounded-full inline-block border-2 border-black/[.40] hover:bg-black/[.60] hover:text-white text-center"
      >
        Back to shop
      </Link>
      <Link
        href={`/checkout`}
        className="font-bold text-white py-2 px-8  rounded-full inline-block bg-black/[.40] hover:bg-black/[.60] text-center"
      >
        Checkout
      </Link>
    </div>
  );
};

export default Cart;
