import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import UnorderedList from "../UnorderedList/UnorderedList";
import { useContext, useEffect, useMemo, useState } from "react";
import { useWindowSize } from "react-use";
import KeenSliderContext from "@/contexts/KeenSliderContext/KeenSilderContext";
import { KeenSliderContextValues } from "@/contexts/KeenSliderContext/KeenSlider";
import { Categories } from "@/types/Categories";
import { ConfigItems } from "@/types/ConfigItems";
import { Product, Products } from "@/types/Product";
import { productCards } from "../Cards/helpers/productCards";
import ProgressBar from "../ProgressBar/ProgressBar";
import { ListItems } from "@/types/ListItem";

interface SliderProps {
  items: Products | Partial<Product>[];
  listClassName?: React.ComponentProps<"ul">["className"];
  itemClassName?: React.ComponentProps<"li">["className"];
  initialSlideIndex?: number;
}

const TabsSlider: React.FunctionComponent<SliderProps> = ({
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
  } = useContext(KeenSliderContext) as KeenSliderContextValues;

  const cards = productCards({
    data: items,
    itemNumber: 3,
  }) as ListItems;

  const progress = (currentSlide / (totalSlides - 1)) * 100;

  return (
    <div className="relative w-full">
      <div className="absolute w-full h-full">
        <ProgressBar progress={progress} />
      </div>
      <UnorderedList
        items={cards}
        listClassName={`keen-slider ${listClassName}`}
        itemClassName={`keen-slider__slide ${itemClassName}`}
        ref={sliderRef}
        activeItem={currentSlide}
      />
    </div>
  );
};

export default TabsSlider;
