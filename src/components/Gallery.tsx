// import * as React from "react";
import ProductCard2 from "./Cards/ProductCards/ProductCard2";
import UnorderedList from "./UnorderedList/UnorderedList";
import ReactPaginate from "react-paginate";
import { useEffect, useState } from "react";
import { useWindowSize } from "react-use";
import { ListItems } from "@/types/ListItem";

interface GalleryProps {
  items: ListItems;
  itemsPerPage: number;
  itemOffset: number;
  setItemOffset: React.Dispatch<React.SetStateAction<number>>;
  setCurrentPage: (pageNumber: number) => void;
  currentPage: number;
}

const Gallery: React.FunctionComponent<GalleryProps> = ({
  itemsPerPage,
  items,
  itemOffset,
  setItemOffset,
  setCurrentPage,
  currentPage,
}) => {
  const { width, height } = useWindowSize();
  const breakpoits = {
    lg: 1024,
    md: 768,
    sm: 480,
    xsm: 160,
  };

  function handleBreakpoits() {
    if (width > breakpoits.lg) {
      return {
        pageRandeDisplayed: 1,
        marginPagesDisplayed: 5,
      };
    }
    if (width > breakpoits.md) {
      return {
        pageRandeDisplayed: 1,
        marginPagesDisplayed: 5,
      };
    }
    if (width > breakpoits.sm) {
      return {
        pageRandeDisplayed: 0,
        marginPagesDisplayed: 1,
      };
    }
    if (width > breakpoits.xsm) {
      return {
        pageRandeDisplayed: 0,
        marginPagesDisplayed: 1,
      };
    }
  }

  //  itemOffset represents the starting index (or the first item) of the items to be displayed on the current page
  // const [itemOffset, setItemOffset] = useState(0);

  // currentItems represent the sliced items(or array) to be displayed
  const [currentItems, setCurrentItems] = useState<ListItems>([]);

  // pageCount represents the total number of pages
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    //  endOffset represents the ending index (ir the last item) of the items to be displayed on the current page
    const endOffset = itemOffset + itemsPerPage;

    // This is setting the range of items that should be displayed. itemOffset is the starting index (the starting item) and endOffset is the ending index (the ending item)
    setCurrentItems(items.slice(itemOffset, endOffset));

    // This is calculating the total number of pages
    setPageCount(Math.ceil(items.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, items]);

  /**
   * Updates the current item offset (starting index) based on the selected page number.
   *
   * @param {any} event - The click event object. the event object is passed to the function when the user clicks on a page number. It contains information about the event, such as the target element(or page to display) and any data associated with the event
   * @return {void}
   */
  type onPageChange = (selectedItem: { selected: number }) => void;
  const handlePageClick : onPageChange = (selectedItem) => {
    // This is calculating the starting index of the items to be displayed on the next page. It is Ensuring that the new offset is always within the bounds of the items array. It is handling cases where the number of items is not evenly divisible by the itemsPerPage prop. In such cases, the modulo operation ensures that the new offset wraps around to the beginning of the items array when it reaches the end.
    const newOffset = (selectedItem.selected * itemsPerPage) % items.length;

    setItemOffset(newOffset);
    setCurrentPage(selectedItem.selected);
  };

  return (
    <>
      {currentItems.length === 0 ? (
        <div className="flex justify-center md:text-[4em] sm:text-[2em] font-bold items-center h-full w-full p-[2em] text-center">
          No Match Found 🤷{" "}
        </div>
      ) : (
        <div>
          <UnorderedList
            items={currentItems}
            listClassName="flex flex-wrap lg:flex-row md:flex-row sm:flex-col"
            itemClassName="lg:flex-1/3 md:flex-1/2 lg:w-1/3 md:w-1/2 sm:w-full"
          />
          <ReactPaginate
            forcePage={currentPage}
            breakLabel="..."
            nextLabel={<NextButton />}
            onPageChange={handlePageClick}
            pageRangeDisplayed={handleBreakpoits()?.pageRandeDisplayed}
            marginPagesDisplayed={handleBreakpoits()?.marginPagesDisplayed}
            pageCount={pageCount}
            previousLabel={<PrevButton />}
            renderOnZeroPageCount={null}
            containerClassName="flex justify-center gap-2 font-medium p-6 "
            pageClassName="block h-8 w-8 rounded border-2 border-gray-200 bg-white text-center leading-8 text-gray-900"
            previousClassName="inline-flex h-8 w-8 items-center justify-center rounded border-2 border-gray-200 bg-white text-gray-900 rtl:rotate-180"
            nextClassName="inline-flex h-8 w-8 items-center justify-center rounded border-2 border-gray-200 bg-white text-gray-900 rtl:rotate-180"
            activeClassName="block h-8 w-8 rounded border-blue-600 !bg-gray-700 text-center leading-8 text-white"
          />
        </div>
      )}
    </>
  );
};

export default Gallery;

const PrevButton = () => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-3 w-3"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
          clipRule="evenodd"
        />
      </svg>
    </>
  );
};

const NextButton = () => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-3 w-3"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
          clipRule="evenodd"
        />
      </svg>
    </>
  );
};
