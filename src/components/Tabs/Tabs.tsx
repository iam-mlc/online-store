import * as RadixTabs from "@radix-ui/react-tabs";
// import TabList from "./TabsList";
// import TabContent from "./TabsContent";
import { useState } from "react";
import { TriggerAndContent } from "@/types/TriggerAndContent";
import KeenSlider from "@/contexts/KeenSliderContext/KeenSlider";
import dynamic from 'next/dynamic';

const TabList = dynamic(() => import("./TabsList"), {
  ssr: false
})
const TabContent = dynamic(() => import("./TabsContent"), {
  ssr: false
})

interface ITabsProps {
  defaultValue?: string;
  listClassName?: string;
  triggerClassName?: string;
  contentClassName?: string;
  className?: string;
  items: TriggerAndContent[];
  orientation?: "vertical" | "horizontal";
  hasVisualEffect?: boolean
}

const Tabs: React.FunctionComponent<ITabsProps> = ({
  listClassName,
  triggerClassName,
  contentClassName,
  items,
  className,
  orientation,
  hasVisualEffect,
}) => {
  const [activeTab, setActiveTab] = useState("0");

  const triggers = items
    .filter((item) => item.hasOwnProperty("trigger"))
    .map((item) => item.trigger);
  const content = items
    .filter((item) => item.hasOwnProperty("content"))
    .map((item) => item.content);

  return (
    <>
      <RadixTabs.Root
        defaultValue={`${0}`}
        orientation={orientation || "vertical"}
        value={activeTab}
        className={className}
      >

          <TabList
            items={triggers}
            handleTabChange={setActiveTab}
            listClassName={listClassName}
            triggerClassName={triggerClassName}
            hasVisualEffect={hasVisualEffect}
          />

        <TabContent items={content} className={contentClassName} activeTab={activeTab}/>
      </RadixTabs.Root>
    </>
  );
};

export default Tabs;
