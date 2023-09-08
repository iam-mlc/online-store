import Heading from "../../Heading";
import Link from "next/link";
import NextImage from "next/image";
import "react-loading-skeleton/dist/skeleton.css";
import { useContext, useEffect, useMemo, useState } from "react";
import {
  AddToCart,
  Check,
  Close,
  Danger,
  Fullscreen,
  VisitLink,
} from "@/components/Icons";
import { withLoadingSpinner } from "@/components/hocs/withLoadingSpinner";
import { CartContext } from "@/contexts/CartContext/cartContext";
import {
  Product,
  ProductDescription,
  ProductID,
  ProductImage,
  ProductImages,
  ProductPrice,
  ProductStock,
  ProductTitle,
} from "@/types/Product";
import MyButton from "@/components/Button";
import QuantityControl from "@/components/QuantityControl/QuantityControl";
import { useWindowSize } from "react-use";
import { TriggerAndContent } from "@/types/TriggerAndContent";
import { ListItem } from "@/types/ListItem";
import Dialog from "@/components/Dialog/Dialog";
import LocaleContext from "@/contexts/LocaleContext/LocaleContext";
import { ProductCardProps } from "@/types/ProductCard";
import { withScaleEffect } from "@/components/hocs/withScaleEffect";

// interface ProductCardProps {
//   title?: ProductTitle;
//   description?: ProductDescription;
//   price?: ProductPrice;
//   image?: ProductImage;
//   stock?: ProductStock;
//   id: ProductID;
// }

const Button = withScaleEffect(MyButton)
const Image = withLoadingSpinner(NextImage);

const ProductCard2: React.FC<ProductCardProps> = ({
  thumbnail,
  title,
  stock,
  id,
  price,
  description,
}) => {
  return (
    <>
      <div className="md:w-[80vw] lg:w-[70vw] w-[70vw] h-full flex flex-col md:gap-8 gap-4 justify-center items-center">
        <div className="w-full h-full flex gap-6 items-center justify-between md:flex-row flex-col">
          <div className=" md:w-[50%] w-full flex justify-center items-center overflow-hidden rounded-[2em]">
            <div className="">
              <Image
                width={600}
                height={600}
                src={thumbnail || "/"}
                alt={title || ""}
                className="object-contain h-[15vh] md:h-[50vh] "
                loading="lazy"
              />
            </div>
          </div>

          <div className="md:w-[50%] w-full flex flex-col">
            <div className="w-full flex flex-col gap-4">
              <div className="flex gap-4 justify-center w-fit m-auto">
                <h3 className="md:text-[2em] text-[1.2em] font-bold text-center md:text-left line-clamp-2 m-auto">
                  {title}
                </h3>
                <ProductStatus stock={stock} id={id} />
              </div>

              <p className="line-clamp-3 md:text-base text-[0.8em] text-center md:text-left">
                {description}
              </p>
            </div>
          </div>
        </div>
        <CardButtons id={id} price={price} stock={stock} />
      </div>
    </>
  );
};

const ProductStatus: React.FC<ProductCardProps> = ({ stock }) => {
  return (
    <>
      {stock !== undefined && (
        <>
          {stock > 0 && (
            <div className="bg-green-500/[.15] p-2 rounded-full w-fit flex gap-4">
              {/* <p className="text-green-500 font-bold text-[0.8em] md:text-base">AVAILABLE</p> */}
              <div className="md:w-6 md:h-6 w-5 h-5 m-auto">
                <Check className="roudend-full fill-green-500" />
              </div>
            </div>
          )}
          {stock == 0 && (
            <div className="bg-red-500/[.15] p-2 rounded-full w-fit flex gap-4">
              {/* <p className="text-red-500 font-bold text-[0.8] md:text-base">NOT AVAILABLE</p> */}
              <div className="md:w-6 md:h-6 w-5 h-5 m-auto">
                <Danger className="fill-red-500 stroke-2 stroke-red-500" />
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

const CardButtons: React.FunctionComponent<ProductCardProps> = ({
  id,
  price,
  stock,
}) => {
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useContext(CartContext);
  const { numberToCurrency } = useContext(LocaleContext);

  return (
    <>
      <div className="relative  md:gap-5 flex-col md:flex-row md:w-auto flex w-full ">
        <div className="flex md:flex-row gap-4 md:justify-center flex-col items-center">
          <div className="md:text-[1.8em] text-[1.2em] font-bold md:flex md:items-center ">
            {Number.isNaN(quantity) ? (
              <span>{numberToCurrency(0)}</span>
            ) : (
              <span>{numberToCurrency((price || 0) * quantity)}</span>
            )}
          </div>
          <div className="md:h-[2.5em] h-[1.8em] font-bold ">
            <QuantityControl
              quantity={quantity}
              setQuantity={setQuantity}
              isRounded={true}
              iconClassName="stroke-black"
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-6 mt-8 md:mt-0">
          <div className="md:w-fit md:block w-full ">
            <Button
              className="md:w-auto md:h-auto rounded-full md:text-base text-[0.8em] md:inline-block bg-black/[.40] hover:bg-black/[.60] w-full h-full data-[disabled=true]:opacity-[.35] opacity-100 "
              disabled={stock == 0 ? true : false}
              data-disabled={stock == 0 ? true : false}
              onClick={() => {
                addToCart({ itemID: id || "", quantity: quantity });
              }}
            >
              <span className="px-1 py-2 md:py-2 md:px-8 block font-bold md:inline-block text-white">
                Add to Cart
              </span>
            </Button>
          </div>
          <div>
            <Link
              href={`/products/${id}`}
              className="md:w-auto md:h-auto rounded-full md:text-base text-[0.8em] md:inline-block block outline-2 outline-black/[.40] hover:bg-black/[.60] w-full h-full text-center "
            >
              <span className="px-1 py-2 md:py-2 md:px-8 block font-bold md:inline-block hover:text-white text-black/[.40]">
                Learn More
              </span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard2;
