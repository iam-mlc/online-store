import AddtoCart from "@/components/Product/AddToCart";
import FAQs from "@/components/Product/FAQ";
import OtherProducts from "@/components/Product/OtherProducts";
import InfoTabs from "@/components/Product/InfoTabs";
import Status from "@/components/Product/Status";
import FeaturedImageSlider from "@/components/keenSlider/FeaturedImageSlider/FeaturedImageSlider";
import KeenSlider from "@/contexts/KeenSliderContext/KeenSlider";
import { Product } from "@/types/Product";
import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import fetchData from "@/utils/fetchData";
import { useContext, useEffect, useState } from "react";
import LocaleContext from "@/contexts/LocaleContext/LocaleContext";
import BackgroundImage from "@/components/BackgroundImage";
import "keen-slider/keen-slider.min.css";
import { useFetchProducts } from "@/hooks/useFetchProducts";
import ProductsSlider from "@/components/keenSlider/ProductsSlider";
import ProductsBanner from "@/components/ProductsBanner";

interface IProductPageProps {
  product: Product;
  error: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const url = "https://dummyjson.com/products";

  const { data, error, status } = await fetchData(url);

  return { paths: [], fallback: true };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const url = `https://dummyjson.com/products/${params?.id}`;

  const { data: product, status } = await fetchData(url);

  if (status === "Not found") {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }

  if (status === "Error") {
    return {
      redirect: {
        destination: "/error",
        permanent: false,
      },
    };
  }

  return { props: { product } };
};

const ProductPage: React.FunctionComponent<IProductPageProps> = ({
  product,
  error,
}) => {
  const router = useRouter();
  const { numberToCurrency } = useContext(LocaleContext);

  if (router.isFallback) {
    return (
      <main>
        <section className="w-screen h-screen">
          <div className="relative top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col gap-6 w-fit h-fit text-center">
            <h1 className="text-5xl font-bold animate-bounce">LOGO</h1>
            <span className="text-xs font-bold">Loading...</span>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main>
      <section className="md:pb-28 pb-28 ">
        <div className="flex lg:flex-row flex-col-reverse relative  h-full lg:gap-0 gap-32">
          <div className="lg:w-[50%] w-full h-full md:h-[30em]">
            <KeenSlider spacing={5} slidesPerView={1} key={router.asPath}>
              <FeaturedImageSlider
                listClassName="w-full h-full"
                itemClassName=" "
                hasNavigationControls={true}
                hasThumbnail={true}
                hasLightbox={true}
                images={product.images.slice(0, 5)}
                title={product.title}
              />
            </KeenSlider>
          </div>
          <div className="relative lg:w-[50%] w-full h-full md:rounded-r-full overflow-hidden md:h-[30em]">
            <div className="flex flex-col gap-5 h-full md:text-left text-center justify-center text-white p-16">
              {/* <span className="font-bold opacity-50 text-sm">
                {product.brand}
              </span> */}
              <div className="flex md:flex-row flex-col items-center justify-between md:gap-0 gap-10">
                <h1 className="lg:text-5xl md:text-4xl text-2xl font-bold ">
                  {product.title}
                </h1>
                <div className="">
                  <Status data={product} />
                </div>
              </div>
              <h3 className="md:text-2xl text-lg font-bold ">
                {numberToCurrency(product.price)}
              </h3>
              <p>{product.description}</p>
            </div>
            <BackgroundImage src={product.thumbnail} isBlurred={true} />
          </div>
        </div>
        <AddtoCart data={product} />
      </section>

      <section className="md:pb-[15em] pb-[10em]">
        <div className="lg:w-full md:w-full sm:full">
          <InfoTabs data={product} />
        </div>
      </section>

      <section className="md:pb-[15em] pb-[10em]">
        <FAQs data={product} />
      </section>
      <section>
        <OtherProducts data={product} />
      </section>
    </main>
  );
};


export default ProductPage;
