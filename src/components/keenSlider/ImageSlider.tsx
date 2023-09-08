import "keen-slider/keen-slider.min.css";
import UnorderedList from "../UnorderedList/UnorderedList";
import { useContext, useEffect, useState } from "react";
import KeenSliderContext from "@/contexts/KeenSliderContext/KeenSilderContext";
import { KeenSliderContextValues } from "@/contexts/KeenSliderContext/KeenSlider";
import NextImage from "next/image";
import { withLoadingSpinner } from "@/components/hocs/withLoadingSpinner";

type Picture = {
  title: string;
  thumbnail: string;
};

type Pictures = Picture[];

interface SliderProps {
  items: Pictures;
  listClassName?: React.ComponentProps<"ul">["className"];
  itemClassName?: React.ComponentProps<"li">["className"];
  initialSlideIndex?: number;
}

const Image = withLoadingSpinner(NextImage);

const ImageSlider: React.FunctionComponent<SliderProps> = ({
  items,
  itemClassName,
  listClassName,
  initialSlideIndex,
}) => {
  const {
    currentSlide,
    moveToPrev,
    moveToNext,
    moveToSlide,
    destroySlider,
    sliderRef,
    loaded,
    dragStarted,
    slideChanged,
    totalSlides,
    firstSlide,
    lastSlide,
    dragEnded,
    rtl,
  } = useContext(KeenSliderContext) as KeenSliderContextValues;

  const images = items.map((data, index) => {
    return {
      label: data.title + index,
      component: (
        <>
          <Image
            width={800}
            height={800}
            src={data.thumbnail}
            alt={data.title}
            className={`object-cover bg-black w-full h-full`}
            loading="lazy"
          />
        </>
      ),
    };
  });

  return (
    <UnorderedList
      items={images}
      listClassName={`keen-slider ${listClassName}`}
      itemClassName={`keen-slider__slide ${itemClassName}`}
      ref={sliderRef}
      activeItem={currentSlide}
    />
  );
};

export default ImageSlider;
