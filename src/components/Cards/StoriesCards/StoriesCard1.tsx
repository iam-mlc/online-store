// import * as React from "react";
import { useContext, useEffect, useState } from "react";
import Button from "../../Button";
import Image from "next/image";
import {
  ProductDescription,
  ProductImage,
  ProductPrice,
  ProductTitle,
} from "@/types/Product";
import { Action } from "react-insta-stories/dist/interfaces";
import LocaleContext from "@/contexts/LocaleContext/LocaleContext";

interface StoriesCard1Props {
  title: ProductTitle;
  description: ProductDescription;
  productImage: ProductImage;
  price: ProductPrice;
  action?: Action;
}

const StoriesCard1: React.FunctionComponent<StoriesCard1Props> = ({
  title,
  description,
  productImage,
  price,
  action,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imagesLoadedCount, setImagesLoadedCount] = useState(0);
  const {numberToCurrency} = useContext(LocaleContext)

  const handleImageLoad = () => {
    setImagesLoadedCount((prevCount) => prevCount + 1);
  };
  useEffect(() => {
    if (!imageLoaded) {
      if (action !== undefined) {
        action("pause");
      }
    }
  }, [imageLoaded]);

  useEffect(() => {
    if (imagesLoadedCount === 2) {
      setImageLoaded(true);
      if (action !== undefined) {
        action("play");
      }
    }
  }, [imagesLoadedCount]);

  return (
    <>
      <div className="w-full h-full overflow-hidden">
        {!imageLoaded && <Loading />}
        <div className="relative block group h-full">
          <Image
            width={1000}
            height={1000}
            src={productImage}
            alt={title}
            className="h-full w-full object-cover transition duration-500 group-hover:opacity-90 sm:h-full blur-md"
            onLoad={handleImageLoad}
            loading="lazy"
          />
          <div className="absolute top-0 flex flex-col items-start justify-end p-6 bg-black w-full h-full opacity-50"></div>
          <div className="absolute inset-0  flex flex-col items-center justify-center p-6 w-full gap-5">
            <Image
              width={600}
              height={600}
              src={productImage}
              alt={title}
              className="h-[18em] w-[18em] object-cover transition duration-500 group-hover:opacity-90"
              onLoad={handleImageLoad}
              loading="lazy"
            />
            <div className="flex flex-col gap-4 items-center justify-end text-center">
              <h3 className="text-xl font-medium text-white ">{title}</h3>
              <p className="mt-1.5 max-w-[40ch] text-xs text-white line-clamp-3">
                {description}
              </p>
              <h4 className="text-3xl font-medium text-white">{numberToCurrency(price)}</h4>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const Loading = () => {
  return (
    <div className="w-full h-full absolute top-0 overflow-hidden backdrop-blur-lg bg-black/[.50] z-[999]">
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
export default StoriesCard1;
