import { PortalProps } from "@radix-ui/react-portal";
import { withLoadingSpinner } from "@/components/hocs/withLoadingSpinner";
import { withScaleEffect } from "@/components/hocs/withScaleEffect";
import SimpleButton from "@/components/Button";
import QuantityControl from "@/components/QuantityControl/QuantityControl";
import { CartContext } from "@/contexts/CartContext/cartContext";
import { useContext, useEffect, useState } from "react";
import { useWindowSize } from "react-use";
import NextImage from "next/image";
import { Product } from "@/types/Product";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import LocaleContext from "@/contexts/LocaleContext/LocaleContext";

const Portal = dynamic<PortalProps>(
  () => import("@radix-ui/react-portal").then((mod) => mod.Portal),
  { ssr: false }
);

const Image = withLoadingSpinner(NextImage);
const Button = withScaleEffect(SimpleButton);

interface AddtoCartProps {
  data: Product;
}

const AddtoCart: React.FunctionComponent<AddtoCartProps> = ({ data }) => {
  return (
    <>
      <Portal className="fixed bottom-0 w-full z-[990] bg-white flex border-t-2 border-black/[.10] ">
        <div className="md:flex lg:px-8 md:px-4 px-0 w-full md:justify-between flex md:bg-white bg-black/[.40]">
          <ProductTitle data={data} />
          <CartButton data={data} />
        </div>
      </Portal>
    </>
  );
};

const ProductTitle: React.FunctionComponent<AddtoCartProps> = ({ data }) => {
  return (
    <div className="flex items-center gap-6 ">
      <div className="md:block hidden">
        <Image
          width={100}
          height={100}
          loading="lazy"
          src={data.thumbnail}
          alt={data.title}
          className="object-cover lg:w-[4em] lg:h-[4em] md:w-[3em] md:h-[3em] sm:w-[3em] sm:h-[3em] rounded-full"
        />
      </div>
      <div>
        <div className="lg:text-2xl md:text-xl font-semibold lg:w-[30ch] md:w-[18ch] md:block hidden">
          <p className="overflow-hidden truncate ">{data.title}</p>
        </div>
      </div>
    </div>
  );
};

const CartButton: React.FunctionComponent<AddtoCartProps> = ({ data }) => {
  const [quantity, setQuantity] = useState(1);
  const { numberToCurrency } = useContext(LocaleContext);
  const { width } = useWindowSize();
  const breakpoints = {
    lg: 1024,
    md: 768,
    sm: 480,
    xsm: 360,
  };

  const { addToCart } = useContext(CartContext);
  const router = useRouter();

  useEffect(() => {
    setQuantity(1);
  }, [router.asPath]);

  return (
    <>
      <div className="relative md:p-4 md:gap-5 flex-row md:flex-row md:w-auto flex w-full">
        <div className="text-xl font-bold md:flex md:items-center hidden">
          <span>{numberToCurrency(data.price * quantity)}</span>
        </div>
        <div className="md:h-auto h-full font-bold ">
          <QuantityControl
            quantity={quantity}
            setQuantity={setQuantity}
            isRounded={width > breakpoints.md ? true : false}
            iconClassName="stroke-white md:stroke-black"
          />
        </div>
        <div className="md:w-fit md:block w-full ">
          <Button
            className="md:w-auto md:h-auto md:py-2 md:px-8 md:rounded-full md:text-base text-[0.8em] md:inline-block md:bg-black/[.40] bg-black/[0] hover:bg-black/[.60] w-full h-full data-[disabled=true]:opacity-[.35] opacity-100"
            disabled={data.stock == 0 ? true : false}
            data-disabled={data.stock == 0 ? true : false}
            onClick={() => {
              addToCart({ itemID: data.id, quantity: quantity });
            }}
          >
            <span className="p-4 block font-bold md:p-0 md:inline text-white">
              Add to Cart
            </span>
          </Button>
        </div>
      </div>
    </>
  );
};

export default AddtoCart;
