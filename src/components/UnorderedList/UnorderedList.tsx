import * as React from "react";
import { forwardRef, useEffect, useState } from "react";
import { ListItems } from "@/types/ListItem";

interface UnorderedListProps {
  items: ListItems;
  listClassName?: React.ComponentProps<"ul">["className"];
  itemClassName?: React.ComponentProps<"li">["className"];
  ref?: React.ForwardedRef<HTMLUListElement>;
  activeItem?: number;
}

const UnorderedList = forwardRef<HTMLUListElement, UnorderedListProps>(
  ({ items, listClassName = "", itemClassName = "", activeItem }, ref) => {
    return (
      <ul className={listClassName} ref={ref}>
        {items.map((item, index) => (
          <li key={item.label + `${index}`} className={itemClassName}>
            {item.component}
          </li>
        ))}
      </ul>
    );
  }
);

export default UnorderedList;
