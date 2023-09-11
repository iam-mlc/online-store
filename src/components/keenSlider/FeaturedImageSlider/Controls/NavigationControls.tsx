import { KeenSliderContextValues } from "@/contexts/KeenSliderContext/KeenSlider";
import NextButton from "../Buttons/Next";
import PrevButton from "../Buttons/Prev";

interface NavigationControlsProps {
  currentSlide: number;
  totalSlides: number;
  moveToNext: () => void;
  moveToPrev: () => void;
  className?: string;
  canHideOnSmallScreens?: boolean;
}

const NavigationControls: React.FC<NavigationControlsProps> = ({
  currentSlide,
  moveToPrev,
  moveToNext,
  totalSlides,
  className,
  canHideOnSmallScreens: hideOnSmallScreens,
}) => {
  return (
    <div
      className={`absolute w-full h-full lg:block md:block ${
        hideOnSmallScreens === true ? "sm:hidden" : ""
      }`}
    >
      <div
        className={`absolute top-1/2 -translate-y-1/2 z-30 left-0 ${
          currentSlide === 0 ? "opacity-0" : "opacity-100"
        } ml-3`}
      >
        <PrevButton
          onClick={(e) => {
            e.stopPropagation;
            moveToPrev();
          }}
          className={`${className}`}
          disabled={currentSlide === 0 ? true : false}
        />
      </div>
      <div
        className={`absolute top-1/2 -translate-y-1/2 z-30 right-0 ${
          currentSlide === totalSlides ? "opacity-0" : "opacity-100"
        } mr-3`}
      >
        <NextButton
          onClick={(e) => {
            e.stopPropagation;
            moveToNext();
          }}
          className={`${className}`}
          disabled={currentSlide === totalSlides ? true : false}
        />
      </div>
    </div>
  );
};

export default NavigationControls;
