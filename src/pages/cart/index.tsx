import { withLoadingSpinner } from "@/components/hocs/withLoadingSpinner";
import { productCards } from "@/components/Cards/helpers/productCards";
import Cart from "@/components/Cart/Cart";
import FeaturedProducts from "@/components/FeaturedProducts/FeaturedProducts";
import { Delete } from "@/components/Icons";
import Table from "@/components/Table/Table";
import { tables } from "@/components/Table/helpers/table";
import UnorderedList from "@/components/UnorderedList/UnorderedList";
import { CartContext } from "@/contexts/CartContext/cartContext";
import ProductContext from "@/contexts/ProductsContext/ProductsContext";
import { useFetchAndQuery } from "@/hooks/useFetchAndQuery";
import { ConfigItems } from "@/types/ConfigItems";
import { ListItems } from "@/types/ListItem";
import { ProductInCart, Products } from "@/types/Product";
import { QueryResponse } from "@/types/QueryResponse";
import toCamelCase from "@/utils/toCamelCase";
import dynamic from "next/dynamic";
import NextImage from "next/image";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useFetchProducts } from "@/hooks/useFetchProducts";
import shuffleArray from "@/utils/shuffleArary";

// const FeaturedProducts = dynamic(
//   () => import("@/components/FeaturedProducts/FeaturedProducts"),
//   {
//     ssr: false,
//   }
// );

interface ICartProps {}

type GalleryTitle = string;

interface GalleryProps {
  data: Products;
  title: GalleryTitle;
}

const CartPage: React.FunctionComponent<ICartProps> = ({}) => {
  const url = "https://dummyjson.com/products";
  const { products } = useFetchProducts(url);

  const selectRandomProducts = useCallback(
    (items: Products) => {
      const products = shuffleArray(items);

      return products.slice(0, 8);
    },
    [products]
  );

  return (
    <main className="">
      <section className="flex justify-center">
        <Cart />
      </section>
      <section>
        <FeaturedProducts
          data={selectRandomProducts(products)}
          title="Featured products"
        />
      </section>
    </main>
  );
};

export default CartPage;
