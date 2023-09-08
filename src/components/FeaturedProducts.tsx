// "use client";
import KeenSlider from "@/contexts/KeenSliderContext/KeenSlider";
import ProductCardSlider from "./keenSlider/ProductsSlider";
import { useWindowSize } from "react-use";
import { Product, Products } from "@/types/Product";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { memo, useCallback, useEffect, useState } from "react";



interface FeaturedProductsProps {
  data: Products | Partial<Product>[] | undefined;
  hasReversedSlider?: boolean;
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({
  data,
  hasReversedSlider,
}) => {
  const { width } = useWindowSize();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  // console.log("RENDERED")


  const breakpoits = {
    lg: 1024,
    md: 768,
    sm: 360,
    xsm: 270,
  };

  const handleBreakpoits = useCallback(() => {
    if (width > breakpoits.lg) {
      return 3;
    }
    if (width > breakpoits.md) {
      return 2.4;
    }
    if (width > breakpoits.sm) {
      return 1.2;
    }
    if (width > breakpoits.xsm) {
      return 1.2;
    }
  }, [width, data]);




  // function handleBreakpoits() {
  //   if (width > breakpoits.lg) {
  //     return 3;
  //   }
  //   if (width > breakpoits.md) {
  //     return 2.4;
  //   }
  //   if (width > breakpoits.sm) {
  //     return 1.2;
  //   }
  //   if (width > breakpoits.xsm) {
  //     return 1.2;
  //   }
  // }

  if (data === undefined) {
    return (
      <Loading
        receivesSliderBreakpoint={handleBreakpoits()}
        hasReversedSlider={hasReversedSlider}
      />
    );
  }

  return (
    <>
      <KeenSlider
        slidesPerView={handleBreakpoits()}
        isRTL={hasReversedSlider}
        rubberband={false}
        key={router.asPath}
      >
        <ProductCardSlider items={data} cardNumber={3} key={router.asPath}/>
      </KeenSlider>
    </>
  );
};

interface LoadingProps extends Omit<FeaturedProductsProps, "data"> {
  receivesSliderBreakpoint?: number;
}

const Loading: React.FC<LoadingProps> = ({
  receivesSliderBreakpoint,
  hasReversedSlider,
}) => {
  const placeholders = new Array(6).fill({});

  return (
    <>
      <KeenSlider
        slidesPerView={receivesSliderBreakpoint}
        isRTL={hasReversedSlider}
        rubberband={false}
      >
        <ProductCardSlider items={placeholders} cardNumber={3} />
      </KeenSlider>
    </>
  );
};

export default FeaturedProducts;
