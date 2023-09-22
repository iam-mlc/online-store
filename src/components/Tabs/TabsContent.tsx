import { forwardRef } from "react";
import * as RadixTabs from "@radix-ui/react-tabs";
import { ListItems } from "@/types/ListItem";
import { Transition } from "@headlessui/react";

interface TabContentProps {
  items: ListItems;
  ref?: any;
  className?: string;
  activeTab?: string;
}

const TabContent = forwardRef<HTMLDivElement, TabContentProps>(
  ({ items, className, activeTab }, ref) => {
    return (
      <>
        {items.map((item, index) => (
          <Transition
            as={"div"}
            appear={true}
            unmount={false}
            show={activeTab === `${index}`}
            enter="transition-all duration-500"
            enterFrom="opacity-0 "
            enterTo="opacity-100 "
            leave="transition-all duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            key={`${item.label}-${index}`}
            className="h-[80vh]"
          >
            <RadixTabs.Content
              key={`${item.label}-${index}`}
              value={`${index}`}
              className={className}
            >
              {item.component}
            </RadixTabs.Content>
          </Transition>
        ))}
      </>
    );
  }
);

export default TabContent;
