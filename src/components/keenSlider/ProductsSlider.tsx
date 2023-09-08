"use client"
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import UnorderedList from "../UnorderedList/UnorderedList";
import { useContext, useEffect, useState } from "react";
import { useWindowSize } from "react-use";
import KeenSliderContext from "@/contexts/KeenSliderContext/KeenSilderContext";
import { KeenSliderContextValues } from "@/contexts/KeenSliderContext/KeenSlider";
import { Categories } from "@/types/Categories";
import { ConfigItems } from "@/types/ConfigItems";
import { Product, Products } from "@/types/Product";
import { productCards } from "../Cards/helpers/productCards";
import { Next, Prev } from "../Icons";
import { ListItems } from "@/types/ListItem";
import { useRouter } from "next/router";
import MyButton from "../Button";
import { withScaleEffect } from "../hocs/withScaleEffect";

interface SliderProps {
  items: Products | Partial<Product>[];
  listClassName?: React.ComponentProps<"ul">["className"];
  itemClassName?: React.ComponentProps<"li">["className"];
  initialSlideIndex?: number;
  cardNumber: string | number;
}

const Button = withScaleEffect(MyButton)


const ProductsSlider: React.FunctionComponent<SliderProps> = ({
  items,
  itemClassName,
  listClassName,
  cardNumber,
}) => {
  const [isReady, setIsReady] = useState(false);
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
    updateSlider
  } = useContext(KeenSliderContext) as KeenSliderContextValues;
  useEffect(() =>{
    if (typeof window !== 'undefined') {
      setIsReady(true)
    }
  },[])

  const { width } = useWindowSize();
  const router = useRouter();

  const breakpoints = {
    lg: 1024,
    md: 768,
    sm: 480,
    xsm: 280,
  };

  const cards = productCards({
    data: items,
    itemNumber: cardNumber,
  }) as ListItems;

  // useEffect(() => {
  //   updateSlider();
  //   console.log("router changed")
  // },[router.asPath])

  return (
    <>
      {isReady && <div className={`relative flex `}>
        <UnorderedList
          items={cards}
          listClassName={`keen-slider lg:mx-10 ${listClassName}`}
          itemClassName={`keen-slider__slide ${itemClassName}`}
          ref={sliderRef}
          activeItem={currentSlide}
        />
        {breakpoints.lg < width && (
          <div>
            <PrevButton />
            <NextButton />
          </div>
        )}
      </div>}
    </>
  );
};

const buttonStyles =
  "bg-black/[.30] backdrop-blur-sm  absolute top-[50%] translate-y-[-50%]  z-50  rounded-[1em]";
const iconStyles =
  "lg:w-[80px] lg:h-[80px] p-2 md:w-[60px] md:h-[60px] w-[40px] h-[40px] fill-white/[.60]";

const PrevButton: React.FC = () => {
  const { moveToPrev, currentSlide, totalSlides, firstSlide, rtl } = useContext(
    KeenSliderContext
  ) as KeenSliderContextValues;
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    moveToPrev();
    setClicked(true);
    setTimeout(() => setClicked(false), 200);
  };

  return (
    <>
      <Button
        className={`${buttonStyles} ${
          currentSlide === firstSlide ? "hidden" : ""
        } ${rtl ? "rotate-180 right-0 mr-2" : " rotate-0  left-0 ml-2"}`}
        onClick={handleClick}
      >
        <Prev className={iconStyles} />
      </Button>
    </>
  );
};

const NextButton: React.FC = () => {
  const { moveToNext, currentSlide, lastSlide, firstSlide, rtl, totalSlides } =
    useContext(KeenSliderContext) as KeenSliderContextValues;

  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    moveToNext();
    setClicked(true);
    setTimeout(() => setClicked(false), 200);
  };

  return (
    <Button
      className={`${buttonStyles}  ${
        currentSlide === lastSlide ? "hidden" : ""
      } ${rtl ? "rotate-180 left-0 ml-2" : "right-0 rotate-0 mr-2"}`}
      onClick={handleClick}
    >
      <Next className={iconStyles} />
    </Button>
  );
};

export default ProductsSlider;
