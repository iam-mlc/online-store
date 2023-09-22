import { useEffect, useMemo, useState } from "react";
import KeenSlider from "@/contexts/KeenSliderContext/KeenSlider";
import { storiesCards } from "@/components/Cards/helpers/storiesCards";
import { avatarsCreator } from "@/components/Avatar/helper/avatars";
import UnorderedList from "../UnorderedList/UnorderedList";
import * as Portal from "@radix-ui/react-portal";
import { Close } from "../Icons";
import { QueryResponse } from "@/types/QueryResponse";
import { Products } from "@/types/Product";
import { Categories, Category } from "@/types/Categories";
import StoriesSlider from "@/components/keenSlider/StoriesSlider";
import { useRouter } from "next/router";
import { useFetchProducts } from "@/hooks/useFetchProducts";

interface ProductStoriesProps {
  query: QueryResponse;
}
interface TriggerProps {
  slideIndex: number;
  handleStoriesDialog: (isOpen: boolean, slideIndex?: number) => void;
  children: React.ReactNode;
  className?: string;
  canOpenDialog?: boolean;
}

const ProductStories: React.FunctionComponent<ProductStoriesProps> = ({
  query,
}) => {
  const url = "https://dummyjson.com/products";
  const { categories } = useFetchProducts(url);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const router = useRouter();

  const handleStoriesDialog = (isOpen: boolean, slideIndex?: number) => {
    if (slideIndex !== undefined) {
      setCurrentSlide(slideIndex);
    }

    setDialogOpen(isOpen);
  };

  categories.sort((a, b) =>
    a.title === "All products" ? -1 : b.title === "All products" ? 1 : 0
  );

  useEffect(() => {
    setDialogOpen(false);
  }, [router.asPath]);

  const triggers = useMemo(() => {
    const items = JSON.parse(JSON.stringify(categories)).filter(
      (category: Category<Products>) => category.title !== "All products"
    );

    const avatars = avatarsCreator({
      data: items,
      itemNumber: 0,
    });

    return avatars.map((item, index) => {
      return {
        label: item.label,
        component: (
          <>
            <Trigger
              slideIndex={index}
              handleStoriesDialog={handleStoriesDialog}
              canOpenDialog={true}
            >
              {item.component}
            </Trigger>
          </>
        ),
      };
    });
  }, [categories]);

  const stories = useMemo(() => {
    const items: Categories<Products> = JSON.parse(
      JSON.stringify(categories)
    ).filter(
      (category: Category<Products>) => category.title !== "All products"
    );

    return items.map((item, index) => {
      const storiesConfig = storiesCards({
        data: item.items,
        itemNumber: 2,
      });

      const category = {
        ...item,
        items: storiesConfig,
      };

      return category;
    });
  }, [categories]);

  return (
    <>
      <UnorderedList
        listClassName="md:flex sm:flex gap-6 overflow-scroll w-full px-7 py-4 scrollbar-hide bg-gray-100 md:justify-center sm:justify-start lg:hidden"
        itemClassName="text-center"
        items={triggers}
      />
      {dialogOpen && (
        <Portal.Root className="fixed w-full h-full z-[9999] top-0">
          <div className="bg-black  w-full">
            <Trigger
              className="w-4 h-4 absolute top-0 right-0 m-6 z-[9999]"
              handleStoriesDialog={handleStoriesDialog}
              slideIndex={0}
            >
              <Close className="stoke-white opacity-70" />
            </Trigger>
            <div className="w-full h-full">
              <KeenSlider initialSlide={currentSlide}>
                <StoriesSlider
                  items={stories}
                  listClassName="w-full h-screen"
                  handleDialog={handleStoriesDialog}
                />
              </KeenSlider>
            </div>
          </div>
        </Portal.Root>
      )}
    </>
  );
};

const Trigger: React.FunctionComponent<TriggerProps> = ({
  children,
  slideIndex,
  handleStoriesDialog,
  className,
  canOpenDialog,
}) => {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        handleStoriesDialog(canOpenDialog || false, slideIndex);
      }}
      className={className}
    >
      {children}
    </button>
  );
};

export default ProductStories;
