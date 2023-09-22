import { useEffect, useMemo, useState } from "react";
import { avatarsCreator } from "@/components/Avatar/helper/avatars";
import KeenSlider from "@/contexts/KeenSliderContext/KeenSlider";
import TabsSlider from "@/components/keenSlider/TabsSlider";
import { Products } from "@/types/Product";
import { Categories } from "@/types/Categories";
import Tabs from "../Tabs";
import { ListItem } from "@/types/ListItem";
import { TriggerAndContent } from "@/types/TriggerAndContent";
import { useWindowSize } from "react-use";

interface ITabsProps {
  data: Categories<Products> | undefined;
}

const CategoryTabs: React.FunctionComponent<ITabsProps> = ({ data }) => {
  const [items, setItems] = useState<Categories<Products>>([]);

  useEffect(() => {
    if (data) {
      const dataItems = data.filter((item) => {
        return item.title !== "All products";
      });
      setItems(dataItems);
    }
  }, [data]);

  const { width, height } = useWindowSize();
  const breakpoits = {
    lg: 1024,
    md: 768,
    sm: 480,
    xsm: 100,
  };

  function handleBreakpoits() {
    if (width > breakpoits.lg) {
      return 1.7;
    }
    if (width > breakpoits.md) {
      return 1.9;
    }
    if (width > breakpoits.sm) {
      return 1.2;
    }
    if (width > breakpoits.xsm) {
      return 1.2;
    }
  }

  const tabsItems: TriggerAndContent[] = useMemo(() => {
    // const items: Categories<Products> = JSON.parse(JSON.stringify(data));

    const avatars = avatarsCreator({
      data: items,
      itemNumber: 1,
    });

    const tabs = items.map((item, index) => {
      const avatar = avatars[index];

      const slider: ListItem = {
        label: item.title + index,
        component: (
          <>
            <KeenSlider
              slidesPerView={handleBreakpoits()}
              loop={true}
              origin={"center"}
            >
              <TabsSlider items={item.items} />
            </KeenSlider>
          </>
        ),
      };

      return {
        trigger: avatar,
        content: slider,
      };
    });

    return tabs;
  }, [items]);

  if (data && data.length === 0 && items.length === 0) {
    return <Loading />;
  }

  return (
    <>
      <Tabs
        items={tabsItems}
        listClassName="flex flex-row gap-4 px-8 sm:overflow-x-scroll lg:overflow-hidden md:justify-center sm:justify-start scrollbar-hide max-[768px]:pl-8  max-[990px]:pl-[8em]"
        triggerClassName="rounded-full p-4 border-black h-[8em] min-w-[8em] block relative overflow-hidden"
        className="flex flex-col gap-4"
        hasVisualEffect={true}
      />
    </>
  );
};

const Loading = () => {
  const placeholders = Array(6).fill({});

  const { width, height } = useWindowSize();
  const breakpoits = {
    lg: 1024,
    md: 768,
    sm: 480,
    xsm: 200,
  };

  function handleBreakpoits() {
    if (width > breakpoits.lg) {
      return 1.7;
    }
    if (width > breakpoits.md) {
      return 1.9;
    }
    if (width > breakpoits.sm) {
      return 1.8;
    }
    if (width > breakpoits.xsm) {
      return 1.2;
    }
  }

  const tabsItems: TriggerAndContent[] = (function () {
    const items: Categories<Products> = JSON.parse(
      JSON.stringify(placeholders)
    );

    const avatars = avatarsCreator({
      data: items,
      itemNumber: 1,
    });

    const tabs = items.map((item, index) => {
      const avatar = avatars[index];

      const slider: ListItem = {
        label: "Placeholder" + index,
        component: (
          <>
            <KeenSlider
              slidesPerView={handleBreakpoits()}
              loop={true}
              origin={"center"}
            >
              <TabsSlider items={items} />
            </KeenSlider>
          </>
        ),
      };

      return {
        trigger: avatar,
        content: slider,
      };
    });

    return tabs;
  })();

  return (
    <>
      <Tabs
        items={tabsItems}
        listClassName="flex flex-row gap-4 px-8 sm:overflow-x-scroll lg:overflow-hidden md:justify-center sm:justify-start scrollbar-hide max-[768px]:pl-8  max-[990px]:pl-[8em]"
        triggerClassName="rounded-full p-4 border-black h-[8em] min-w-[8em] block relative overflow-hidden"
        className="flex flex-col gap-4"
        hasVisualEffect={true}
      />
    </>
  );
};

export default CategoryTabs;
