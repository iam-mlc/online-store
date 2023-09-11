import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import UnorderedList from "../UnorderedList/UnorderedList";
import { useContext, useEffect, useMemo, useState } from "react";
import { useWindowSize } from "react-use";
import KeenSliderContext from "@/contexts/KeenSliderContext/KeenSilderContext";
import { Story } from "react-insta-stories/dist/interfaces";
import Stories from "react-insta-stories";
import { storiesCards } from "../Cards/helpers/storiesCards";
import { ConfigItem, ConfigItems } from "@/types/ConfigItems";
import { Categories } from "@/types/Categories";
import { KeenSliderContextValues } from "@/contexts/KeenSliderContext/KeenSlider";

interface StoriesSliderProps {
  items: Categories<ConfigItems>;
  listClassName?: React.ComponentProps<"ul">["className"];
  itemClassName?: React.ComponentProps<"li">["className"];
  // storiesConfig: Story[]
  handleDialog?: (isOpen: boolean) => void;
}

const StoriesSlider: React.FunctionComponent<StoriesSliderProps> = ({
  itemClassName = "",
  listClassName = "",
  items,
  handleDialog,
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
  const [currentId, setCurrentId] = useState(0);
const next = () => {
    setCurrentId(currentId + 1)
}
useEffect(()=>{
  if(slideChanged){
    setCurrentId(0)
  }
},[])

  // if(currentSlide === lastSlide  && handleDialog !== undefined){
  //   handleDialog(false);
  // }

  const handleSlider = () => {
    if (loaded) {
      if (currentSlide === lastSlide && handleDialog !== undefined) {
        handleDialog(false);
      } else if (currentSlide < lastSlide) {
        moveToNext();
      }
    }
  };

  const stories = useMemo(() => {
    return items.map((item, index) => {
      const storiesConfig = item.items.map((item) => item.config);

      const stories = {
        label: item.title,
        component: (
          <>
            <Stories
              key={`${item.title}-${index}`}
              stories={storiesConfig}
              defaultInterval={3000}
              width={"100%"}
              height={"100%"}
              progressStyles={{
                borderRadius: "80em",
              }}
              currentIndex={slideChanged ? 0 : undefined}
              onAllStoriesEnd={handleSlider}
              // onStoryStart={(id: number)=>{setCurrentId(id)}}
            />
          </>
        ),
      };
      // item.items = result;

      return stories;
    });
  }, [items, loaded, slideChanged]);

  const { width, height } = useWindowSize();
  const breakpoits = {
    lg: 1024,
    md: 768,
    sm: 480,
    xsm: 360,
  };

  function handleBreakpoits() {
    if (width > breakpoits.lg) {
      return 1.4;
    }
    if (width > breakpoits.md) {
      return 1.9;
    }
    if (width > breakpoits.sm) {
      return 1.8;
    }
    if (width > breakpoits.xsm) {
      return 1;
    }
  }

  return (
    <>
      <UnorderedList
        items={stories}
        listClassName={`keen-slider ${listClassName}`}
        itemClassName={`keen-slider__slide ${itemClassName}`}
        ref={sliderRef}
        activeItem={currentSlide}
      />
    </>
  );
};

export default StoriesSlider;
