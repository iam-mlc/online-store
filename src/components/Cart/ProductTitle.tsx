import { withLoadingSpinner } from "@/components/hocs/withLoadingSpinner";
import { ProductInCart } from "@/types/Product";
import NextImage from "next/image";

const Image = withLoadingSpinner(NextImage);

interface ProductTitle {
  data: ProductInCart;
}

const ProductTitle: React.FC<ProductTitle> = ({ data }) => {
  return (
    <div>
      <div className="flex gap-4  items-center w-full sm:justify-center md:justify-start">
        <div className="md:w-[7em] md:h-[6em] w-[5em] h-[3em] rounded-[1em] overflow-hidden sm:hidden md:block">
          <Image
            src={data.thumbnail}
            alt={data.title}
            width={100}
            height={100}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="font-bold md:text-lg ">{data.title}</div>
      </div>
    </div>
  );
};

export default ProductTitle;
