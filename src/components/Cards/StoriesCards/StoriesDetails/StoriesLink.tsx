import { Product } from "@/types/Product";
import Link from "next/link";
import { Action } from "react-insta-stories/dist/interfaces";

interface StoriesLinkProps {
//   toggleMore: (show: boolean) => void;
//   action: Action;
  data: Product
}

const StoriesLink: React.FC<StoriesLinkProps> = ({
//   toggleMore,
//   action,
  data
}) => {
  return (
    <>
      <Link
        href={`/products/${data.id}`}
        className="text-xl font-bold relative text-center text-Black p-2 bg-gray-200 block w-full"
        //   onClick={() => toggleMore(true)}
      >
        See More
      </Link>
    </>
  );
};

export default StoriesLink;
