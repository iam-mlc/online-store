import Link from "next/link";
import { useContext, useState } from "react";
import Image from "next/image";
import {
  ProductDescription,
  ProductID,
  ProductImage,
  ProductPrice,
  ProductStock,
  ProductTitle,
} from "@/types/Product";
import LocaleContext from "@/contexts/LocaleContext/LocaleContext";
import { ProductCardProps } from "@/types/ProductCard";

// interface ProductCardProps {
//   title?: ProductTitle;
//   description?: ProductDescription;
//   price?: ProductPrice;
//   image?: ProductImage;
//   stock?: ProductStock;
//   id: ProductID;
// }

interface LoadingSpinnerProps {
  className?: string;
}

const ProductCard1: React.FunctionComponent<ProductCardProps> = ({
  price,
  title,
  thumbnail,
  id,
}) => {
  // const style: CSSProperties = {
  //   "--image-url": `url(${image})`,
  // } as React.CSSProperties;
  const [imageLoaded, setImageLoaded] = useState(false);
  const { numberToCurrency } = useContext(LocaleContext);

  if (title === undefined && price === undefined && thumbnail === undefined) {
    return <Loading />;
  }

  return (
    <div className="lg:w-[100%] md:w-[100%] sm:w-full py-16 lg:px-8 md:px-6 sm:px-3">
      <Link
        // style={style}
        href={`/products/${id}`}
        className="relative block overflow-hidden lg:rounded-[3em] md:rounded-[2em] sm:rounded-[1.5em] shadow-2xl"
      >
        <div className={`absolute inset-0 bg-black/50 z-[2]`}></div>
        {!imageLoaded && <LoadingSpinner />}
        <Image
          width={800}
          height={800}
          alt=""
          src={thumbnail ? thumbnail : ""}
          className="absolute inset-0 w-full h-full object-cover"
          onLoad={() => setImageLoaded(true)}
          loading="lazy"
        />
        <div className="relative flex items-start justify-between p-4 sm:p-6 lg:p-8">
          <div className="sm:pt-44 pt-12 text-white lg:pt-[10em] flex flex-col gap-4 z-[3]">
            <div className="ml-2">
              <h3 className="text-2xl font-bold">
                {numberToCurrency(price || 0)}
              </h3>
              <p className="text-sm">{title}</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ className }) => {
  return (
    <div
      className={
        className !== undefined
          ? className
          : "w-full h-full absolute top-0 overflow-hidden backdrop-blur-lg bg-black/[.20] z-[2] animate-pulse"
      }
    >
      <div className="relative group h-full w-full flex justify-center items-center">
        <svg
          width="50"
          height="50"
          viewBox="0 0 50 50"
          className="animate-spin opacity-70"
        >
          <circle
            cx="25"
            cy="25"
            r="20"
            stroke="white"
            strokeWidth="6"
            fill="none"
            strokeDasharray="80"
            strokeDashoffset="20"
          />
        </svg>
      </div>
    </div>
  );
};

const Loading = () => {
  return (
    <>
      <div className="lg:w-[100%] md:w-[100%] sm:w-full py-16 lg:px-8 md:px-6 sm:px-3 animate-pulse">
        <div className="relative block overflow-hidden lg:rounded-[3em] md:rounded-[2em] sm:rounded-[1.5em] shadow-2xl bg-[image:var(--image-url)] bg-cover bg-center bg-no-repeat ">
          <div className={`absolute inset-0 bg-gray-400 z-[2]`}></div>
          <div className="relative flex items-start justify-between p-4 sm:p-6 lg:p-8">
            <div className="sm:pt-44 pt-12 lg:pt-[10em] flex flex-col gap-4 z-[3]">
              <div className="ml-2 flex flex-col gap-2">
                <div className="w-[5em] p-4 bg-gray-200 rounded-xl"></div>
                <div className="w-[10em] p-2 bg-gray-200 rounded-md"></div>
              </div>
            </div>
            <span className="absolute right-10 inline-flex items-center gap-0.5 rounded-full bg-gray-200 px-2 py-3  z-[3] w-[3em]"></span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard1;
