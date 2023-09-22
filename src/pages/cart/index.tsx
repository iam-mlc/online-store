import Cart from "@/components/Cart/Cart";
import FeaturedProducts from "@/components/FeaturedProducts/FeaturedProducts";
import { Products } from "@/types/Product";
import { useCallback } from "react";
import { useFetchProducts } from "@/hooks/useFetchProducts";
import shuffleArray from "@/utils/shuffleArary";

interface ICartProps {}


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
