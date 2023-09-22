import { forwardRef } from "react";

interface OrderedListProps {
  items: { label: string; component: React.ReactNode }[];
  listClassName?: string;
  itemClassName?: string;
  ref?: any;
  activeItem?: number;
}

const OrderedList = forwardRef<HTMLOListElement, OrderedListProps>(
  ({ items, listClassName, itemClassName, activeItem }, ref) => {
    return (
      <ol className={listClassName} ref={ref}>
        {items.map((item, index) => (
          <li key={item.label + `${index}`} className={itemClassName}>
            {item.component}
          </li>
        ))}
      </ol>
    );
  }
);

export default OrderedList;
