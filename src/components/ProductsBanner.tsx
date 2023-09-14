import { Category } from "@/types/Categories";
import { Products } from "@/types/Product";
import { organizeData } from "@/utils/groupByCategory";
import { memo, useEffect, useMemo, useState } from "react";
import FeaturedProducts from "./FeaturedProducts";
import Banner from "./Cards/HomePageCards/Banner";
import { QueryResponse } from "@/types/QueryResponse";
import { BannerDetails } from "@/types/BannerDetails";
import dynamic from "next/dynamic";


interface ProductsBannerProps {
  copywriteMessage: BannerDetails[] | BannerDetails;
  isReversed?: boolean;
  data?: Products | undefined;
}

const ProductsBanner: React.FC<ProductsBannerProps> = memo(({
  copywriteMessage,
  isReversed,
  data,
}) => {


  const images = useMemo(() => {
    if (data) {
      return data.map((item) => {
        return {
          title: item.title,
          thumbnail: item.thumbnail,
        };
      });
    } else {
      return [];
    }
  }, [data]);

  if (data === undefined || data.length === 0) {
    return (
      <Loading isReversed={isReversed}/>
    );
  }

  return (
    <div className="relative flex flex-col gap-10">
      <div>
        <Banner
          images={images}
          details={copywriteMessage}
          isReversed={isReversed}
        />
      </div>
      <div className="">
        <FeaturedProducts data={data} hasReversedSlider={isReversed} />
      </div>
    </div>
  );
});

const Loading = ({ isReversed }: Pick<ProductsBannerProps, "isReversed">) => {
  return (
    <div className="relative flex flex-col gap-10">
      <div>
        <Banner
          images={undefined}
          details={undefined}
          isReversed={isReversed}
        />
      </div>
      <div className="">
        <FeaturedProducts data={undefined} hasReversedSlider={isReversed} />
      </div>
    </div>
  );
};

export default ProductsBanner;
