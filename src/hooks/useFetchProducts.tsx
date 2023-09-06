import { useEffect, useState } from "react";
import { Products } from "@/types/Product";
import { useFetchAndQuery } from "./useFetchAndQuery";
import { QueryResponse } from "@/types/QueryResponse";
import { Categories, Category } from "@/types/Categories";
import { organizeData } from "@/utils/groupByCategory";

interface useFetchProductsParams {
  url: string;
}

export const useFetchProducts = (url: string) => {
  const productsQuery = useFetchAndQuery(url) as QueryResponse;
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [products, setProducts] = useState<Products>([]);
  const [categories, setCategories] = useState<Categories<Products>>([]);
    // const categories: Categories<Products> = organizeData(products);
  function getCategory(name: string) {
    if (categories) {
      return categories.find((item) => item.title.toLowerCase() === name.toLowerCase() );
    }
  }



  //   useEffect(() => {
  //     if (productsQuery.data) {
  //       setProducts(productsQuery.data.products);
  //     }
  //   }, [productsQuery.data]);

  useEffect(() => {
    if (
      !(
        productsQuery.isLoading &&
        products.length === 0 &&
        categories.length === 0
      )
    ) {
      setIsLoading(false);
    }

    if (isError && products.length === 0 && categories.length === 0) {
      setIsError(true);
    }
  }, [productsQuery]);

  useEffect(() => {
    if (productsQuery.data) {
      setProducts(productsQuery.data.products);
    }
  }, [productsQuery.data]);

  useEffect(() => {
    if (!(products.length === 0)) {
      setCategories(organizeData(products));
    }
  }, [products]);

  return {
    isLoading,
    isError,
    products,
    categories,
    getCategory,
  };
};
