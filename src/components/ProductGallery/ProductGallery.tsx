import { useEffect, useMemo, useRef, useState } from "react";
import { productCards } from "@/components/Cards/helpers/productCards";
import Gallery from "@/components/Gallery";
import SearchBar from "@/components/SearchBar/SearchBar";
import UnorderedList from "@/components/UnorderedList/UnorderedList";
import lunr from "lunr";
import sanitizeInput from "@/utils/sanitizeInput";
import { Products } from "@/types/Product";
import { Categories, Category } from "@/types/Categories";
import { ListItems } from "@/types/ListItem";
import { useRouter } from "next/router";
import { useFetchProducts } from "@/hooks/useFetchProducts";

interface IProductGalleryProps {}
interface handleCategoryChange {
  categoryIndex: number;
  items: ListItems;
}

const ProductGallery: React.FunctionComponent<IProductGalleryProps> = ({}) => {
  const url = "https://dummyjson.com/products";
  const { products, categories, isLoading } = useFetchProducts(url);
  const searchRef = useRef<HTMLInputElement>(null);
  const [searchValue, setSearchValue] = useState("");
  const [itemOffset, setItemOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [categoryPath, setCategoryPath] = useState<
    string | string[] | undefined
  >("");
  const router = useRouter();
  const categoryQuery = router.query.category;
  const inputElement = searchRef.current;
  categories.sort((a, b) =>
    a.title === "All products" ? -1 : b.title === "All products" ? 1 : 0
  );

  const [currentItems, setCurrentItems] = useState<ListItems>([]);

  const [activeTab, setActiveTab] = useState(0);

  const handleCategoryChange = ({
    categoryIndex,
    items,
  }: handleCategoryChange) => {
    setActiveTab(categoryIndex);
    setCurrentItems(items);
    setItemOffset(0);
    setCurrentPage(0);
  };

  useEffect(() => {
    handleSearch(searchValue);
    const handleKeyUp = (e: KeyboardEvent) => {
      if (router.asPath !== "/products") {
        router.replace({
          pathname: "/products",
        });
      }
    };
    if (inputElement) {
      inputElement.addEventListener("keyup", handleKeyUp);

      return () => {
        inputElement.removeEventListener("keyup", handleKeyUp);
      };
    }
  }, [searchValue]);

  useEffect(() => {
    if (router.isReady) {
      setCategoryPath(router.query.category);
    }
  }, [router.query.category]);

  const cards = useMemo(() => {
    const items: Categories<Products> = JSON.parse(JSON.stringify(categories));

    return items.map((category) => {
      const cards = productCards({
        data: category.items,
        itemNumber: 3,
      }) as ListItems;

      const result: Category<ListItems> = { ...category, items: cards };

      return result;
    });
  }, [categories]);

  useEffect(() => {
    if (cards.length !== 0) {
      setCurrentItems(cards[0].items);
    }
  }, [cards]);

  useEffect(() => {
    categories.forEach((category, index) => {
      if (category.pathName === categoryPath) {
        if (cards.length !== 0) {
          handleCategoryChange({
            categoryIndex: index,
            items: cards[index].items,
          });
        }
      }
    });
  }, [categoryPath]);

  const triggers = useMemo(() => {
    return categories.map((category, index) => {
      return {
        label: category.title,
        component: (
          <button
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
              if (cards.length !== 0) {
                handleCategoryChange({
                  categoryIndex: index,
                  items: cards[index].items,
                });
              }
              if (index === 0) {
                router.replace({
                  pathname: "/products",
                });
              } else {
                router.replace({
                  pathname: "/products",
                  query: { ...router.query, category: category.pathName },
                });
              }
            }}
            className={`mx-auto block bg-gray-200 rounded-full p-2 ${
              activeTab === index ? "bg-gray-700 text-white" : ""
            }`}
          >
            <span className="font-semibold whitespace-nowrap">
              {category.title || ""}
            </span>
          </button>
        ),
      };
    });
  }, [categories, activeTab, cards]);

  const customPipeline = function (this: lunr.Builder) {
    this.pipeline.reset();
    this.pipeline.add(
      lunr.trimmer,
      lunr.stopWordFilter
    );
  };

  const index = useMemo(() => {
    return lunr(function () {
      this.use(customPipeline);
      this.ref("id");
      this.field("title", { boost: 10 });
      this.field("description", { boost: 2 });

      products.forEach((item) => {
        this.add(item);
      });
    });
  }, [products]);

  const handleSearch = (query: string) => {
    if (cards.length !== 0) {
      setActiveTab(0);

      const value = sanitizeInput(query);

      const results = cards[0].items.filter((item) => {
        return index
          .search(`*${value}*`)
          .find(({ ref }) => item.label.toString() === ref);
      });

      setCurrentItems(results);

      if (query.length === 0) {
        handleCategoryChange({
          categoryIndex: 0,
          items: cards[0].items,
        });
        // router.replace({
        //   pathname: "/products",
        // });
      }
    }
  };

  if (isLoading || !router.isReady) {
    return <Loading />;
  }

  return (
    <>
      <section className="p-8 w-full flex justify-center">
        <SearchBar handleSearch={setSearchValue} ref={searchRef}></SearchBar>
      </section>
      <section>
        <UnorderedList
          items={triggers}
          listClassName="flex flex-row overflow-scroll gap-4 p-5 lg:justify-center md:justify-center bg-gray-100 scrollbar-hide"
          itemClassName=""
        />
        <Gallery
          items={currentItems}
          itemsPerPage={6}
          itemOffset={itemOffset}
          setItemOffset={setItemOffset}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </section>
    </>
  );
};

const Loading = () => {
  const categoryNames = new Array(6).fill(0);
  const placeholders = new Array(6).fill({});

  const cards = productCards({
    data: placeholders,
    itemNumber: 3,
  }) as ListItems;

  const triggers = categoryNames.map((categoryName) => {
    return {
      label: "",
      component: (
        <button
          className={`mx-auto block bg-gray-200 rounded-full p-2 animate-pulse`}
        >
          <span className="font-semibold whitespace-nowrap p-2 w-[5em] block"></span>
        </button>
      ),
    };
  });
  const avatars = categoryNames.map((categoryName) => {
    return {
      label: "",
      component: (
        <div className="flex flex-col justify-center items-center gap-3">
          <div
            className={`mx-auto block bg-gray-200 rounded-full p-8 animate-pulse`}
          ></div>
          <div className="p-2 w-[5em] block animate-pulse bg-gray-200 rounded-md"></div>
        </div>
      ),
    };
  });

  return (
    <>
      <UnorderedList
        items={avatars}
        listClassName="flex flex-row overflow-scroll gap-6 p-5 lg:justify-center md:justify-center bg-gray-100 scrollbar-hide lg:hidden"
        itemClassName=""
      />
      <div className="p-8 w-full flex justify-center animate-pulse ">
        <div className="bg-gray-200 w-full flex items-center rounded-full">
          <div className="py-5 px-4  w-full "></div>
        </div>
      </div>
      <div>
        <UnorderedList
          items={triggers}
          listClassName="flex flex-row overflow-scroll gap-4 p-5 lg:justify-center md:justify-center bg-gray-100 scrollbar-hide  "
          itemClassName=""
        />
        <UnorderedList
          items={cards}
          listClassName="flex flex-wrap lg:flex-row md:flex-row sm:flex-col"
          itemClassName="lg:flex-1/3 md:flex-1/2 lg:w-1/3 md:w-1/2 sm:w-full"
        />
        <div className="w-full p-6">
          <div className="p-4 bg-gray-200 w-24 m-auto rounded-xl"></div>
        </div>
      </div>
    </>
  );
};

export default ProductGallery;
