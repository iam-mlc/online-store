import {
  forwardRef,
  memo,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import * as RadixTabs from "@radix-ui/react-tabs";

import { useWindowSize } from "react-use";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { motion, AnimatePresence } from "framer-motion";
import { ListItems } from "@/types/ListItem";
import KeenSliderContext from "@/contexts/KeenSliderContext/KeenSilderContext";
import { KeenSliderContextValues } from "@/contexts/KeenSliderContext/KeenSlider";
import { useActiveElementVisualEffect } from "@/hooks/useActiveElementVisualEffect";
import { withScaleEffect } from "../hocs/withScaleEffect";

interface TabListProps {
  items: ListItems;
  listClassName?: string;
  triggerClassName?: string;
  ref?: any;
  // activeItem?: number;
  handleTabChange: (tab: string) => void;
  hasVisualEffect?: boolean;
}


const TabList = forwardRef<HTMLDivElement, TabListProps>(
  (
    {
      items,
      listClassName,
      triggerClassName,
      handleTabChange,
      hasVisualEffect,
    },
    ref
  ) => {
    const [loaded, setLoaded] = useState(false);
    const list = document.getElementById("parentElement");
    const elementWithEffect = document.getElementById("effect");
    
    const { activeElement, handleActiveElement } = useActiveElementVisualEffect(
      {
        parentElement: list,
        elementWithEffect: elementWithEffect,
      }
    );
    useEffect(() => {
      handleActiveElement(0);
    }, [loaded]);

    // console.log(activeElement)

    return (
      <RadixTabs.List
        className={`${listClassName}`}
        ref={(list) => {
          if (list) {
            setLoaded(true);

          }
        }}
        id="parentElement"
      >
        {items.map((item, index) => (
          <RadixTabs.Trigger
            key={`${item.label}-${index}`}
            value={`${index}`}
            className={`z-10 ${triggerClassName}`}
            onClick={(e) => {
              e.stopPropagation();
              handleTabChange(`${index}`);
              if (handleActiveElement) {
                handleActiveElement(index);
              }
            }}
          >
            {item.component}
          </RadixTabs.Trigger>
        ))}
        {hasVisualEffect && (
          <div
            className="absolute bg-gray-200 transition-all duration-500 "
            id="effect"
          ></div>
        )}
      </RadixTabs.List>
    );
  }
);

export default TabList;
