import Button from "@/components/Button";
import Image from "next/image";
import { useContext, useState } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import Slider2 from "@/components/keenSlider/Template";
import Dialog from "@/components/Dialog/Dialog";
import KeenSlider from "@/contexts/KeenSliderContext/KeenSlider";
import QuantityControl from "@/components/QuantityControl/QuantityControl";
import { Product } from "@/types/Product";
import FeaturedImageSlider from "@/components/keenSlider/FeaturedImageSlider/FeaturedImageSlider";
import { CartContext } from "@/contexts/CartContext/cartContext";
import Link from "next/link";
import LocaleContext from "@/contexts/LocaleContext/LocaleContext";

interface ISeeMoreProps {
  close: any;
  data: Product;
}

const SeeMore: React.FunctionComponent<ISeeMoreProps> = ({ close, data }) => {
  const [quantity, setQuantity] = useState(1);
  const {numberToCurrency} = useContext(LocaleContext)

  return (
    <>
      <div className="w-full h-full bg-white p-6 flex flex-col gap-6 relative overflow-y-scroll overflow-x-hidden">
        <div className="text-xl font-extrabold" onClick={close}>
          Go back
        </div>
        <p className="line-clamp-none">{data.description}</p>
        {data.images.length !== 0 && (
          <div className="flex flex-col gap-4">
            <div className="">
              <KeenSlider spacing={5}>
                <FeaturedImageSlider
                  listClassName="w-full h-full"
                  itemClassName="w-fit"
                  hasNavigationControls={true}
                  hasThumbnail={true}
                  hasLightbox={true}
                  images={data.images}
                  title={data.title}
                />
              </KeenSlider>
            </div>
          </div>
        )}
        <div className="flex gap-4 relative bottom-0 w-full left-0 justify-center bg-white">
          <AddToCartButton data={data} productQuantity={quantity} />
          <GoToCartButton />
        </div>
        <div className="text-center flex gap-4 items-center justify-center">
          <QuantityControl
            quantity={quantity}
            setQuantity={setQuantity}
            isRounded={true}
          />
          <span className="text-2xl font-bold">
            {numberToCurrency((data.price) * quantity)}
          </span>
        </div>
      </div>
    </>
  );
};

interface AddToCartButtonProps {
  data: Product;
  productQuantity: number;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  data,
  productQuantity,
}) => {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="">
      <Button
        className="w-auto h-auto py-2 px-4 rounded-full text-base text-[0.8em] inline-block bg-black/[.40] hover:bg-black/[.60] data-[disabled=true]:opacity-[.35] opacity-100"
        disabled={data.stock == 0 ? true : false}
        data-disabled={data.stock == 0 ? true : false}
        onClick={() => {
          addToCart({ itemID: data.id, quantity: productQuantity });
        }}
      >
        <span className="font-bold inline text-white">Add to Cart</span>
      </Button>
    </div>
  );
};
const GoToCartButton: React.FC = ({}) => {
  return (
    <div className="">
      <Link
        className="w-auto h-auto py-2 px-4 rounded-full text-base text-[0.8em] inline-block bg-black/[.40] hover:bg-black/[.60]"
        href={"/cart"}
      >
        <span className="font-bold inline text-white">Go to Cart</span>
      </Link>
    </div>
  );
};

export default SeeMore;
