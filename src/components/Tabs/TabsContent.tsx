// import * as React from "react";
import { Fragment, forwardRef } from "react";
import * as RadixTabs from "@radix-ui/react-tabs";
import { motion, AnimatePresence } from "framer-motion";
import { ListItems } from "@/types/ListItem";
import { Transition } from "@headlessui/react";

interface TabContentProps {
  items: ListItems;
  ref?: any;
  className?: string;
  activeTab?: string;
}

// const contentVariants = {
//   initial: { translate: 0, x: -100 },
//   enter: { translate: 1, x: 0, transition: { duration: 0.3 } },
//   exit: { translate: 0, x: 100, transition: { duration: 0.3 } },
// };

const TabContent = forwardRef<HTMLDivElement, TabContentProps>(
  ({ items, className, activeTab }, ref) => {
    return (
      <>
        {items.map((item, index) => (
          <Transition
            as={Fragment}
            appear={true}
            unmount={false}
            show={activeTab === `${index}`}
            enter="transition-all duration-200"
            enterFrom="opacity-0 "
            enterTo="opacity-100 "
            leave="transition-all duration-200"
            leaveFrom="opacity-100 "
            leaveTo="opacity-0"
            key={`${item.label}-${index}`}
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
