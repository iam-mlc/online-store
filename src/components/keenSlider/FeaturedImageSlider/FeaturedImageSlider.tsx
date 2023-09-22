import UnorderedList from "@/components/UnorderedList/UnorderedList";
import { useContext } from "react";
import KeenSliderContext from "@/contexts/KeenSliderContext/KeenSilderContext";
import Thumbnails from "./ThumbnailsGroup";
import LightBox from "./LightBox";
import NavigationControls from "./Controls/NavigationControls";
import { createMainImages } from "../helpers/images";

export interface FeaturedImageSliderProps {
  listClassName?: React.ComponentProps<"ul">["className"];
  itemClassName?: React.ComponentProps<"li">["className"];
  hasThumbnail?: boolean;
  hasNavigationControls?: boolean;
  hasLightbox?: boolean;
  images: string[];
  title: string;
}

const FeaturedImageSlider: React.FunctionComponent<
  FeaturedImageSliderProps
> = ({
  itemClassName,
  listClassName,
  hasThumbnail,
  hasNavigationControls,
  hasLightbox,
  images,
  title,
}) => {
  const {
    currentSlide,
    moveToPrev,
    moveToNext,
    moveToSlide,
    sliderRef,
  } = useContext(KeenSliderContext);

  const mainImages = createMainImages(images, title);

  return (
    <div className={`flex flex-col gap-6 relative h-full w-full`}>
      <div className="absolute top-2 right-2 text-white z-30 px-3 py-1 bg-black/[.50] font-semibold rounded-lg backdrop-blur-xl">
        {currentSlide + 1}/{images.length}
      </div>

      <div className="flex relative h-full w-full">
        {hasNavigationControls && (
          <NavigationControls
            currentSlide={currentSlide}
            totalSlides={images.length - 1}
            moveToNext={moveToNext}
            moveToPrev={moveToPrev}
            className="bg-black/[.30] backdrop-blur-md p-2 rounded-lg h-[3em]"
            canHideOnSmallScreens={true}
          />
        )}

        {hasLightbox && (
          <LightBox initialSlide={currentSlide} images={images} title={title} />
        )}

        <UnorderedList
          items={mainImages}
          listClassName={`keen-slider ${listClassName}`}
          itemClassName={`keen-slider__slide ${itemClassName}`}
          ref={sliderRef}
          activeItem={currentSlide}
        />
      </div>

      {hasThumbnail && (
        <Thumbnails
          currentSlide={currentSlide}
          handleSlide={moveToSlide}
          images={images}
          title={title}
        />
      )}
    </div>
  );
};

export default FeaturedImageSlider;
