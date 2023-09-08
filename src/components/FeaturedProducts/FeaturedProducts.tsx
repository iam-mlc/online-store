import { Products } from "@/types/Product";
import ProductsSlider from "../FeaturedProducts";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

interface FeaturedProductsProps {
  data: Products;
  title: string;
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ data, title }) => {
  const router = useRouter();

  return (
    <>
      <div className="md:p-4 flex flex-col gap-14">
        <div className=" text-center">
          <h2 className="md:text-4xl text-2xl font-bold">{title}</h2>
        </div>
        <div className="w-full">
          {data.length !== 0 ? (
            <ProductsSlider data={data} key={router.asPath} />
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>
    </>
  );
};

export default FeaturedProducts;
