import { Product, Products } from "@/types/Product";
import dynamic from "next/dynamic";
import { useCallback } from "react";
import ProductsBanner from "../ProductsBanner";
import { useFetchProducts } from "@/hooks/useFetchProducts";
import { useRouter } from "next/router";
import shuffleArray from "@/utils/shuffleArary";

interface OtherProductsProps {
  data: Product;
}
const otherProductsDetails = [
  {
    title: `Take a look at these other products we prepared for you `,
  },
  {
    title: `We have more stuff you might like !`,
  },
  {
    title: `We have great products at a great price !`,
  },
  {
    title: `We think you might like these other products`,
  },
];

const randomNumber = Math.floor(Math.random() * otherProductsDetails.length);

const OtherProducts: React.FC<OtherProductsProps> = ({ data }) => {
  const url = "https://dummyjson.com/products";
  const { getCategory, products } = useFetchProducts(url);

  const router = useRouter();

  const category = getCategory(data.category);

  const excludeCurrentProduct = useCallback(
    (items: Products) => {
      return items.filter((item) => item.id !== data.id).slice(0, 8);
    },
    [data]
  );

  const selectRandomProducts = useCallback(
    (items: Products) => {
      const products = shuffleArray(items);

      return products
        .filter(
          (item) => item.category !== data.category && item.id !== data.id
        )
        .slice(0, 8);
    },
    [data]
  );

  const sameCategoryCopywrite = [
    {
      title: `Take a look at these other ${data.category} `,
    },
    {
      title: `We have more ${data.category} just for you`,
    },
    {
      title: `Here are some other ${data.category}`,
    },
    {
      title: `We think you might enjoy these other ${data.category}`,
    },
  ];

  return (
    <div className="flex flex-col gap-28">
      <div>
        <ProductsBanner
          copywriteMessage={sameCategoryCopywrite[randomNumber]}
          isReversed={true}
          data={category ? excludeCurrentProduct(category.items) : undefined}
          key={router.asPath}
        />
      </div>
      <div>
        <ProductsBanner
          copywriteMessage={otherProductsDetails[randomNumber]}
          data={selectRandomProducts(products)}
          key={router.asPath}
        />
      </div>
    </div>
  );
};

export default OtherProducts;
