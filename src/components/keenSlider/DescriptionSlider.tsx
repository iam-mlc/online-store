import UnorderedList from "../UnorderedList/UnorderedList";
import { useContext} from "react";
import KeenSliderContext from "@/contexts/KeenSliderContext/KeenSilderContext";
import { KeenSliderContextValues } from "@/contexts/KeenSliderContext/KeenSlider";
import { ListItems } from "@/types/ListItem";
import BackgroundImage from "../BackgroundImage";
import { BannerDetails } from "@/types/BannerDetails";


interface SliderProps {
  items: BannerDetails[];
  listClassName?: React.ComponentProps<"ul">["className"];
  itemClassName?: React.ComponentProps<"li">["className"];
  initialSlideIndex?: number;
}

const DescriptionSlider: React.FunctionComponent<SliderProps> = ({
  items,
  itemClassName,
  listClassName,
}) => {
  const {
    currentSlide,
    sliderRef,
    rtl,
  } = useContext(KeenSliderContext) as KeenSliderContextValues;

  const description: ListItems = items.map((detail) => {
    return {
      label: detail.title,
      component: (
        <>
          <div
            className={`relative md:w-[70%] lg:w-full w-full h-full flex flex-col gap-12 lg:p-16 p-8 items-center justify-center md:text-left text-center ${
              rtl ? "md:-scale-x-100 md:text-right" : "text-left"
            } lg:text-white`}
          >
            <h3 className="lg:text-5xl md:text-4xl text-3xl font-bold">
              {detail.title}
            </h3>
            {detail.description && <p className={``}>{detail.description}</p>}
            <div className="hidden lg:block">
              <BackgroundImage />
            </div>
          </div>
        </>
      ),
    };
  });

  return (
    <>
      <UnorderedList
        items={description}
        listClassName={`keen-slider ${listClassName}`}
        itemClassName={`keen-slider__slide ${itemClassName}`}
        ref={sliderRef}
        activeItem={currentSlide}
      />
    </>
  );
};

export default DescriptionSlider;
