// import * as React from "react";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";
import NavList from "./NavList";
import { memo, useEffect, useMemo, useState } from "react";
import NavLink from "./NavLink";
import { fromCamelCaseToSpaces } from "@/utils/fromCamelCaseConverters";
import NavBackButton from "./NavBackButton";
import { organizeData } from "@/utils/groupByCategory";
import { productLinks } from "./helper/links";
import { ArrowRight, CaretRight } from "../Icons";
import { Categories, Category } from "@/types/Categories";
import { Products } from "@/types/Product";
import { ListItems } from "@/types/ListItem";

interface DropdownMenuContentProps {
  className?: string;
  orientation?: "vertical" | "horizontal";
  data: Categories<Products>;
  navbarHeight: number;
  receivesDataState?: string;
}

interface CategoryMenu {
  handleValueChange: (value: string) => void;
  categoryValue: string;
  data: Category<ListItems>;
}

interface TitleProps {
  title: string;
}
interface SeeMoreProps {
  data: Category<ListItems>;
}

const DropdownMenuContent: React.FunctionComponent<
  DropdownMenuContentProps
> = ({ className, orientation, data, receivesDataState }) => {
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCategoryChange = (category: string) => {
    setSelectedCategory((preValue) =>
      preValue === `${category}` ? "" : `${category}`
    );
  };

  const links: Categories<ListItems> = useMemo(() => {
    const items: Categories<Products> = JSON.parse(JSON.stringify(data));

    return items.map((item) => {
      const link = productLinks({
        data: item.items,
        itemNumber: 1,
      });

      return { ...item, items: link };
    });
  }, [data]);

  useEffect(() => {
    if (receivesDataState === "closed") {
      setSelectedCategory("");
    }
  }, [receivesDataState]);

  const categoryMenu = useMemo(() => {
    return links.map((item, index) => {
      return {
        label: item.title,
        component: (
          <>
            <CategoryMenu
              categoryValue={`${index}`}
              handleValueChange={handleCategoryChange}
              data={item}
            />
          </>
        ),
      };
    });
  }, [links]);

  return (
    <NavigationMenu.Sub
      className={className}
      orientation={orientation}
      value={selectedCategory}
      onValueChange={(value) => {
        setSelectedCategory(value);
      }}
    >
      <NavList
        items={categoryMenu}
        itemClassName=""
        listClassName="divide-y-[1px] divide-black/10 lg:mt-0 lg:p-4 md:p-4 sm:p-4  "
        orientation="vertical"
      />
      <NavigationMenu.Viewport
        forceMount
        className={`absolute top-0 lg:left-[100%] lg:w-full h-full md:w-[100vw] sm:w-[100vw] bg-white lg:border-l border-black/[.05] transform md:translate-x-[-100%] sm:translate-x-[-100%] lg:translate-x-[-200%] lg:data-[state=open]:translate-x-0 md:data-[state=open]:translate-x-0 sm:data-[state=open]:translate-x-0 lg:data-[state=open]:opacity-1 lg:data-[state=closed]:opacity-0 duration-500 shadow-lg overflow-hidden `}
      />
    </NavigationMenu.Sub>
  );
};

const CategoryMenu: React.FC<CategoryMenu> = ({
  handleValueChange,
  categoryValue,
  data,
}) => {
  return (
    <div>
      {/* Category Button Triggers */}
      <NavigationMenu.Trigger
        className="group active:ghost data-[state=open]:ghost w-full"
        onClick={(event) => {
          event.stopPropagation();
          handleValueChange(categoryValue);
        }}
      >
        <Title title={data.title} />
      </NavigationMenu.Trigger>

      {/* Category Items */}
      <NavigationMenu.Content
        className={`relative overflow-x-hidden overflow-y-auto  h-full md:h-full lg:h-auto data-[motion=from-start]:animate-enterFromLeft data-[motion=from-end]:animate-enterFromRight pb-[72px]`}
      >
        <NavBackButton changeValue={handleValueChange} />
        <NavList
          items={data.items.slice(0, 5)}
          itemClassName=""
          listClassName="lg:bg-inherit p-4 divide-y-[1px] divide-black/[.15] "
        />
        <SeeMoreLink data={data} />
      </NavigationMenu.Content>
    </div>
  );
};

const Title: React.FC<TitleProps> = ({ title }) => {
  return (
    <div className="flex justify-between w-full items-center p-3 ">
      <div className="text-left w-full">
        <span className="font-bold">{title}</span>
      </div>
      <div
        className={`transform group-data-[state=open]:rotate-180 transition-all duration-500`}
      >
        <CaretRight className={`w-5 h-5 opacity-70`} />
      </div>
    </div>
  );
};

const SeeMoreLink: React.FunctionComponent<SeeMoreProps> = ({ data }) => {
  return (
    <>
      <NavLink
        href={{
          pathname: `/products`,
          query: {
            category: data.pathName,
          },
        }} // `/data.pathName`
        className="border-y-[1px] border-black/[.30] inline-block w-full bg-white"
      >
        <div className="flex justify-between p-3 align-middle w-full hover:ghost">
          <span className="font-bold">See More</span>
          <div className="my-auto">
            <ArrowRight className="w-5 h-5" />
          </div>
        </div>
      </NavLink>
    </>
  );
};

export default memo(DropdownMenuContent);
