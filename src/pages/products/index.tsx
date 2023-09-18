import { useContext, useEffect, useMemo, useState } from "react";
import ProductGallery from "@/components/ProductGallery/ProductGallery";
import { QueryResponse } from "@/types/QueryResponse";
import { useFetchAndQuery } from "@/hooks/useFetchAndQuery";
import { Products } from "@/types/Product";

interface ProductsPageProps {}

const ProductsPage: React.FunctionComponent<ProductsPageProps> = ({}) => {
  const url = "https://dummyjson.com/products";
 

  return (
    <main>
      <ProductGallery/>
    </main>
  );
};

export default ProductsPage;
