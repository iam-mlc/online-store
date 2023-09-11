"use client";
import KeenSlider from "@/contexts/KeenSliderContext/KeenSlider";
import * as React from "react";
import ImageSlider from "../keenSlider/ImageSlider";
import Link from "next/link";
import Image from "next/image";
import BackgroundImage from "../BackgroundImage";

interface IHeroSectionProps {}

const HeroSection: React.FunctionComponent<IHeroSectionProps> = ({}) => {
  const images = [
    {
      title: "Laptops",
      thumbnail:
        "/images/homePage/compressed/kari-shea-1SAnrIxw5OY-unsplash.jpg",
    },
    {
      title: "Smartphones",
      thumbnail:
        "/images/homePage/compressed/towfiqu-barbhuiya-5xTYgw2g7aw-unsplash.jpg",
    },
    {
      title: "Fragrances",
      thumbnail:
        "/images/homePage/compressed/akhilesh-sharma-vf6DtLlwjTk-unsplash.jpg",
    },
    {
      title: "Home decoration",
      thumbnail:
        "/images/homePage/compressed/spacejoy-YI2YkyaREHk-unsplash.jpg",
    },
    {
      title: "Skincare",
      thumbnail:
        "/images/homePage/compressed/kimia-zarifi-x4J_92kJBoY-unsplash.jpg",
    },
  ];
  return (
    <>
      <div className="relative flex lg:flex-row md:h-[30em] h-[40em] flex-col overflow-hidden lg:gap-0 gap-10 rounded-b-full md:rounded-none md:rounded-r-full">
        <div className="relative lg:w-[50%] w-full h-full rounded-br-none  rounded-b-full rounded-bl-none overflow-hidden">
          <KeenSlider
            loop={true}
            canAutoChange={true}
            renderMode="performance"
            spacing={5}
            drag={false}
          >
            <ImageSlider items={images} listClassName="h-full" itemClassName="h-full"/>
          </KeenSlider>
          <div className="absolute bg-black/[.70] w-full h-full top-0 right-0 lg:hidden"></div>
        </div>
        <div className="lg:w-[50%] w-[80%] flex flex-col lg:gap-16 gap-16 md:p-8 lg:p-16 absolute lg:static top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] lg:translate-x-0 lg:translate-y-0 justify-center items-center md:items-start">
          <h1 className="lg:text-5xl md:text-4xl text-3xl font-bold text-center md:text-left text-white ">
            In fermentum posuere urna nec tincidunt praesent semper feugiat nibh
          </h1>
          <div className="flex md:gap-8 gap-4">
            <Link
              href={"/products"}
              className="text-[0.8] md:text-base font-bold text-white  py-2 md:px-8 px-4  rounded-full inline-block bg-gray-500 hover:bg-gray-400 text-center"
            >
              See Products
            </Link>
            <div className="hidden lg:block">
              <BackgroundImage />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
