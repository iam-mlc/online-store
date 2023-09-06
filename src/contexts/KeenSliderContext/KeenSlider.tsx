"use client";
import { useEffect, useState } from "react";
import KeenSliderContext from "./KeenSilderContext";
import "keen-slider/keen-slider.min.css";
import {
  KeenSliderHooks,
  KeenSliderInstance,
  KeenSliderOptions,
  KeenSliderPlugin,
  SliderOptions,
  useKeenSlider,
} from "keen-slider/react";
import autoChange from "./plugins/autoChange";

/*
Quick Note:

In the keen slider react.d.ts files you will see some generics. Here I explain whats is expected from those generics:

- T stands for type.
  This is assumed to be a type that extends HTMLElement. This is the type for the DOM node that the slider will be attached to.

- O stands for options.
  This is a generic type for the options that can be passed to the slider. By default, O is an empty object {}, but it can be any type that fits the context in which useKeenSlider is used.

- P stands for plugins.
  This is a generic type for the plugins that can be used with the slider. Similar to O, P is an empty object {} by default, but it can be any type that fits the context in which useKeenSlider is used.

- H stands for hooks.
  This is a generic type that extends string and represents the hooks that can be used with the slider. By default, H is set to KeenSliderHooks keen-slider.io.

*/

interface SliderConfig {
  options: KeenSliderOptions;
  plugins: KeenSliderPlugin[];
}

type Milliseconds = number;

export interface KeenSliderProps {
  children: React.ReactNode;
  initialSlide?: number;
  slidesPerView?: number;
  loop?: boolean;
  drag?: boolean;
  mode?: "snap" | "free" | "free-snap";
  renderMode?: "precision" | "performance" | "custom";
  spacing?: number;
  verticalSlides?: boolean;
  canAutoChange?: boolean;
  rubberband?: boolean;
  disabled?: boolean;
  breakpoints?: {
    [key: string]: Omit<KeenSliderOptions, "breakpoints">;
  };
  origin?: number | "auto" | "center";
  autoChangePeriod?: Milliseconds;
  isRTL?: boolean;
  handleLoading?: (hasLoaded: boolean) => void;
  forceRerender?: boolean;
}

export interface KeenSliderContextValues {
  currentSlide: number;
  moveToPrev: () => void;
  moveToNext: () => void;
  moveToSlide: (index: number) => void;
  destroySlider: () => void;
  updateSlider: () => void;
  sliderRef: (node: HTMLUListElement | HTMLDivElement | null) => void;
  loaded: boolean;
  dragStarted: boolean;
  dragEnded: boolean;
  animationStarted: boolean;
  animationEnded: boolean;
  slideChanged: boolean;
  totalSlides: number;
  firstSlide: number;
  lastSlide: number;
  progress: number;
  rtl: boolean;
}

const KeenSlider: React.FC<KeenSliderProps> = ({
  children,
  initialSlide,
  slidesPerView,
  loop = false,
  drag = true,
  mode,
  renderMode,
  spacing,
  verticalSlides = false,
  canAutoChange,
  rubberband = true,
  breakpoints,
  origin,
  disabled,
  autoChangePeriod = 3000,
  isRTL = false,
  handleLoading,
}) => {
  const [currentSlide, setCurrentSlide] = useState(
    initialSlide !== undefined ? initialSlide : 0
  );
  const [loaded, setLoaded] = useState(false);
  const [canRerender, setCanRerender] = useState(false);
  const [slideChanged, setSlideChanged] = useState(false);
  const [dragStarted, setDragStarted] = useState(false);
  const [totalSlides, setTotalSlides] = useState(0);
  const [firstSlide, setFirstSlide] = useState(0);
  const [lastSlide, setLastSlide] = useState(0);
  const [dragEnded, setDragEnded] = useState(false);
  const [animationStarted, setAnimationStarted] = useState(false);
  const [animationEnded, setAnimationEnded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);

  const options: KeenSliderOptions = {
    initial: initialSlide || 0,
    loop: loop,
    rtl: isRTL,
    drag: drag,
    mode: mode || "snap",
    renderMode: renderMode || "precision",
    rubberband: rubberband,
    breakpoints: breakpoints || {},
    slides: {
      perView: slidesPerView || 1,
      spacing: spacing || 0,
      origin: origin || "auto",
    },
    vertical: verticalSlides,
    slideChanged(slider) {
      if (slider) {
        setCurrentSlide(slider.track.details.rel);
        setSlideChanged(true);
        setProgress(slider.track.details.progress);
      }
    },
    created(slider) {
      if (slider) {
        setLoaded(true);
        if (handleLoading) {
          handleLoading(loaded);
        }
        setLastSlide(slider.track.details.maxIdx);
        setFirstSlide(slider.track.details.minIdx);
        setTotalSlides(slider.slides.length);
        setProgress(slider.track.details.progress);
      }
    },
    // dragged() {
    //   console.log("dragged")
    // },
    dragStarted() {
      setSlideChanged(false);
      setDragStarted(true);
      setDragEnded(false);
    },
    dragEnded() {
      setDragStarted(false);
      setDragEnded(true);
    },
    animationStarted() {
      setAnimationStarted(true);
      setAnimationEnded(false);
      // console.log("animationStarted")
    },
    animationEnded() {
      setSlideChanged(false);
      setAnimationEnded(true);
      setAnimationStarted(false);
      // console.log("animationEnded")
    },
    detailsChanged() {
      // console.log("Details changed");
    },
    optionsChanged() {
      // console.log("Options changed");
    },
  };

  const plugins: KeenSliderPlugin[] = [];

  if (canAutoChange) {
    plugins.push((slider) => {
      autoChange(slider, autoChangePeriod);
    });
  }

  const [sliderRef, sliderInstance] = useKeenSlider<
    HTMLUListElement | HTMLDivElement
  >(options, plugins);

  const slider = sliderInstance.current;

  // useEffect(() => {
  //   if (loaded && slider) {
  //   }
  // }, [sliderInstance, options]);

  useEffect(() =>{
    if (typeof window !== 'undefined') {
      setIsReady(true)
    }
  },[])

  const moveToPrev = () => {
    slider?.prev();
  };
  const moveToNext = () => {
    slider?.next();
  };

  const moveToSlide = (index: number) => {
    slider?.moveToIdx(index);
    setCurrentSlide(index);
  };

  const destroySlider = () => {
    slider?.destroy();
  };

  const updateSlider = () => {
    slider?.update();
  };

  const values: KeenSliderContextValues = {
    currentSlide,
    moveToPrev,
    moveToNext,
    moveToSlide,
    destroySlider,
    sliderRef,
    loaded,
    dragStarted,
    dragEnded,
    animationStarted,
    animationEnded,
    slideChanged,
    totalSlides,
    firstSlide,
    lastSlide,
    progress,
    rtl: isRTL,
    updateSlider,
  };

  return (
    <>
      {isReady && <KeenSliderContext.Provider value={values}>
        <div
          className={`h-full w-full transition-opacity duration-300 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        >
          {children}
        </div>
      </KeenSliderContext.Provider>}
    </>
  );
};

export default KeenSlider;
