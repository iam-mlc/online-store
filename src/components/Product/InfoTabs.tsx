import { memo, useContext, useState } from "react";
import UnorderedList from "@/components/UnorderedList/UnorderedList";
import Tabs from "@/components/Tabs/Tabs";
import { Check, Danger } from "@/components/Icons";
import { Product } from "@/types/Product";

interface InfoTabsProps {
  data: Product;
}

const InfoTabs: React.FunctionComponent<InfoTabsProps> = ({ data }) => {
  const testData = {
    benefits: ["Benefit-1", "Benefit-2", "Benefit-3", "Benefit-4", "Benefit-5"],
    features: ["Feature-1", "Feature-2", "Feature-3", "Feature-4", "Feature-5"],
  };

  const benefits = testData.benefits.map((benefit: string) => {
    return {
      label: "benefits",
      component: <p>{benefit}</p>,
    };
  });
  const features = testData.features.map((feature: string) => {
    return {
      label: "feature",
      component: <p>{feature}</p>,
    };
  });

  const tabsData = [
    {
      title: "Description",
      content: (
        <div className="">
          <p>{data.description}</p>
        </div>
      ),
    },
    {
      title: "Benefits",
      content: (
        <UnorderedList items={benefits} listClassName="list-disc ml-6" />
      ),
    },
    {
      title: "Features",
      content: (
        <UnorderedList items={features} listClassName="list-disc ml-6" />
      ),
    },
  ];

  const tabs = tabsData.map((tab: any) => {
    return {
      trigger: {
        label: tab.title,
        component: (
          <div className=" relative px-0 py-2">
            <h2 className="inline-block md:text-2xl font-semibold">
              {tab.title}
            </h2>
            <div className="absolute bg-black/[.10] p-[2px] bottom-0 left-0 w-full transition-all duration-300 rounded-full"></div>
            <div className="absolute bg-black p-[2px] group-data-[state=active]:w-full bottom-0 left-0 w-0 transition-all duration-300 group-data-[state=active]:opacity-100 opacity-0 rounded-full"></div>
          </div>
        ),
      },
      content: {
        label: tab.title,
        component: tab.content,
      },
    };
  });

  return (
    <>
      <div className="flex flex-col h-full">
        <Tabs
          items={tabs}
          listClassName="flex flex-row justify-center sm:gap-6 md:gap-16 overflow-x-scroll scrollbar-hide pl-8 sm:pl-0"
          triggerClassName="group p-2"
          contentClassName="overflow-hidden p-8 min-h-[10em] bg-gray-200"
          className="flex flex-col sm:gap-4 lg:gap-8"
          orientation="vertical"
        />
      </div>
    </>
  );
};

export default memo(InfoTabs);
