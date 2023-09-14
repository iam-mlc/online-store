import { Product } from "@/types/Product";
import { Check, Danger } from "../Icons";

interface StatusProps {
  data: Product;
}

const Status: React.FC<StatusProps> = ({ data }) => {
  return (
    <>
      {data.stock > 0 && (
        <div className="bg-green-500/[.15] px-4 py-2 rounded-full w-fit flex gap-4">
          <p className="text-green-500 font-bold">AVAILABLE</p>
          <div className="w-6 h-6">
            <Check className="roudend-full fill-green-500" />
          </div>
        </div>
      )}
      {data.stock == 0 && (
        <div className="bg-red-500/[.15] px-4 py-2 rounded-full w-fit flex gap-4">
          <p className="text-red-500 font-bold">NOT AVAILABLE</p>
          <div className="w-6 h-6">
            <Danger className="fill-red-500 stroke-2 stroke-red-500" />
          </div>
        </div>
      )}
    </>
  );
};

export default Status;
