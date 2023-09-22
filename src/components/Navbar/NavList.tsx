import toCamelCase from "@/utils/toCamelCase";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import React, { forwardRef } from "react";

interface NavListProps {
  items: { label: string; component: React.ReactNode; thumbnail?: string }[];
  listClassName?: string;
  itemClassName?: string;
  orientation?: "vertical" | "horizontal";
  indicator?: boolean;
  ref?: any;
  activeItem?: number;
  valueName?: string;
  indexAsValue?: boolean;
}

const NavList = forwardRef<HTMLUListElement, NavListProps>(
  (
    { items, listClassName, itemClassName, orientation, activeItem, valueName },
    ref
  ) => {
    return (
      <NavigationMenu.List
        className={listClassName}
        data-orientation={orientation}
        ref={ref}
      >
        {items.map((item, index) => (
          <NavigationMenu.Item
            key={index}
            className={itemClassName}
            value={
              valueName !== undefined
                ? `${toCamelCase(valueName)}-${index}`
                : `${index}`
            }
            tabIndex={index}
          >
            {item.component}
          </NavigationMenu.Item>
        ))}
      </NavigationMenu.List>
    );
  }
);

export default NavList;
