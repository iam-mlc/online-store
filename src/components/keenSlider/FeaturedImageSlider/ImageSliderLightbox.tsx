import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { useState, useContext } from "react";
import UnorderedList from "@/components/UnorderedList/UnorderedList";
import KeenSliderContext from "@/contexts/KeenSliderContext/KeenSilderContext";
import NavigationControls from "./Controls/NavigationControls";
import LightBoxControls from "./Controls/LighboxControls";
import { KeenSliderContextValues } from "@/contexts/KeenSliderContext/KeenSlider";

interface ImageSliderLightbox {
  items: { label: string; component: React.ReactNode; thumbnail?: string }[];
  itemClassName?: string;
  listClassName?: string;
}

const ImageSliderLightbox: React.FC<ImageSliderLightbox> = ({
  items,
  itemClassName,
  listClassName,
}) => {
  const { currentSlide, moveToPrev, moveToNext, sliderRef, slideChanged } = useContext(
    KeenSliderContext
  ) as KeenSliderContextValues;
  const [grabbing, setGrabbing] = useState(false);

  return (
    <div className={"flex flex-col gap-6 relative w-full h-full"}>
      {
        <TransformWrapper initialScale={1} centerOnInit={true}>
          {({ zoomIn, zoomOut, resetTransform }) => (
            <>
              <NavigationControls
                currentSlide={currentSlide}
                moveToNext={moveToNext}
                moveToPrev={moveToPrev}
                className="lg:h-[4em] md:h-[4em] sm:h-[3.5em]"
                totalSlides={items.length - 1}
              />

              <LightBoxControls
                handlesZoomIn={zoomIn}
                handlesZoomOut={zoomOut}
                handlesResetTransform={resetTransform}
                className="h-[1.5em] w-[1.5em]"
                canViewSlideChange={slideChanged}
              />
              <div className="flex relative w-[90%] h-[80%] m-auto">
                <TransformComponent
                  wrapperClass="!w-full !h-full"
                  contentClass={`!w-full !h-full items-center justify-center `}
                >
                  <div
                    className={`${
                      grabbing ? "cursor-grabbing" : "cursor-grab"
                    } w-full h-full flex justify-center `}
                    onMouseDown={() => setGrabbing(true)}
                    onMouseUp={() => setGrabbing(false)}
                  >
                    <UnorderedList
                      items={items}
                      listClassName={`keen-slider ${listClassName}`}
                      itemClassName={`keen-slider__slide ${itemClassName}`}
                      ref={sliderRef}
                      activeItem={currentSlide}
                    />
                  </div>
                </TransformComponent>
              </div>
            </>
          )}
        </TransformWrapper>
      }
      <div className=" text-white font-bold w-fit h-fit lg:text-3xl md:text-2xl sm:text-xl absolute lg:bottom-5 lg:top-auto md:top-4 sm:top-2  left-1/2 -translate-x-1/2 mb-2">
        <span className="opacity-70">
          {currentSlide + 1}/{items.length}
        </span>
      </div>
    </div>
  );
};

export default ImageSliderLightbox;
