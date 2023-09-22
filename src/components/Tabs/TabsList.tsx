import {
  forwardRef,
  useEffect,
  useState,
} from "react";
import * as RadixTabs from "@radix-ui/react-tabs";
import { ListItems } from "@/types/ListItem";
import { useActiveElementVisualEffect } from "@/hooks/useActiveElementVisualEffect";

interface TabListProps {
  items: ListItems;
  listClassName?: string;
  triggerClassName?: string;
  ref?: any;
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
