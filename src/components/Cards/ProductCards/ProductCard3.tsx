// import * as React from "react";
"use client";
import Heading from "../../Heading";
import Link from "next/link";
import NextImage from "next/image";
import "react-loading-skeleton/dist/skeleton.css";
import { useContext, useEffect, useMemo, useState } from "react";
import {
  Cart,
  Cart as CartIcon,
  Check,
  Close,
  Danger,
  Fullscreen,
  VisitLink,
} from "@/components/Icons";
import { withLoadingSpinner } from "@/components/hocs/withLoadingSpinner";
import { CartContext } from "@/contexts/CartContext/cartContext";
import {
  ProductDescription,
  ProductID,
  ProductImage,
  ProductImages,
  ProductPrice,
  ProductStock,
  ProductTitle,
} from "@/types/Product";

import { TriggerAndContent } from "@/types/TriggerAndContent";
import { ListItem } from "@/types/ListItem";
import Dialog from "@/components/Dialog/Dialog";
import ProductCard2 from "./ProductCard2";
import LocaleContext from "@/contexts/LocaleContext/LocaleContext";
import { ProductCardProps } from "@/types/ProductCard";
import { dialogConfig } from "../helpers/dialogConfig";
import { ConfigItem } from "@/types/ConfigItems";

// interface ProductCardProps {
//   title?: ProductTitle;
//   description?: ProductDescription;
//   price?: ProductPrice;
//   image?: ProductImage;
//   stock?: ProductStock;
//   id: ProductID;
//   itemIndex?: number;
// }

const Image = withLoadingSpinner(NextImage);

const ProductCard3: React.FunctionComponent<ProductCardProps> = (props) => {
  const { numberToCurrency } = useContext(LocaleContext);
  const { title, description, price, thumbnail, stock, id } = props;

  if (
    title === undefined &&
    description === undefined &&
    price === undefined &&
    thumbnail === undefined &&
    stock === undefined
  ) {
    return <Loading />;
  }

  return (
    <div className="relative p-4 w-full ">
      <div className="relative md:rounded-[1.5em] rounded-[2em] overflow-hidden my-12 shadow-2xl h-[18em] ">
        <div className="absolute  bottom-0 right-0 m-8 z-10">
          <DialogButton {...props} />
        </div>
        <Link className="block" href={`/products/${id}`}>
          <div>
            <div className="absolute top-0 left-0 flex flex-col gap-2 m-8 text-white z-10">
              <h4 className="font-semibold opacity-90">{title}</h4>
              <h3 className=" font-bold text-lg">
                {numberToCurrency(price || 0)}
              </h3>
            </div>
          </div>
          <div className="absolute inset-0 -z-10 ">
            <Image
              width={600}
              height={600}
              src={thumbnail || ""}
              alt={title || ""}
              className="w-full h-full object-cover "
              loading="lazy"
            />
          </div>
          <div className="absolute inset-0 h-full w-full bg-black/[.60] z-[5]"></div>
        </Link>
      </div>
      {/* <Loading /> */}
    </div>
  );
};

// const Picture: React.FC<ProductCardProps> = ({ thumbnail, title }) => {
//   return (
//     <div className="relative w-full h-full">

//       <div className="absolute inset-0 h-full w-full bg-black/[.50] z-[5]"></div>
//     </div>
//   );
// };

const DialogButton: React.FC<ProductCardProps> = (props) => {
  const { addToCart } = useContext(CartContext);
  const { title, description, price, thumbnail, stock, id } = props;

  const dialog = dialogConfig({
    data: props,
    itemNumber: 1,
  }) as ConfigItem<TriggerAndContent>;

  return (
    <>
      <div className=" z-20 ">
        <Dialog
          items={dialog.config}
          contentClassName="fixed w-fit h-fit p-8 z-[9999] bg-white top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 rounded-[1.5em] shadow-2xl"
          overlayClassName="fixed inset-0 w-screen h-screen bg-black/[.50] backdrop-blur-md z-[9999]"
          triggerClassName="w-full h-full md:p-3 p-2 inline-block bg-white/[.30] backdrop-blur-md rounded-full"
          closeClassName="absolute top-4 right-4 z-[9999] cursor-pointer w-[2em] h-auto "
          customCloseElement={
            <Close className="stroke-black opacity-60 rounded-full p-2 hover:bg-black/[.20] bg-white/[.80]" />
          }
        />
      </div>
    </>
  );
};

const Loading = () => {
  return (
    <>
      <div className="animate-pulse p-4">
        <div className="group block ">
          <div className="relative h-[18em] md:rounded-[1.5em] rounded-[2em] overflow-hidden shadow-2xl z-20 my-12">
            <div className="absolute inset-0 w-full h-full  bg-slate-300"></div>

            <div className="absolute bg-transparent pt-3 m-8 flex flex-col gap-4 w-full">
              <div className="inset-0 w-[40%] h-full  bg-slate-400 p-2 rounded-xl"></div>

              <div className="mt-1.5 flex lg:flex-row md:flex-row sm:flex-col lg:items-center lg:justify-between md:items-center md:justify-between bg-slate-400 p-2 rounded-xl w-[25%]"></div>
            </div>
            <div className="absolute  bottom-0 right-0 m-8 z-10 bg-slate-400 w-fit  backdrop-blur-md rounded-full md:p-3 p-2">
              <div className="md:w-5 md:h-5 w-6 h-6 m-auto ">
                <Cart className="fill-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard3;
