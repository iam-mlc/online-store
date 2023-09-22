import {
  Dispatch,
  SetStateAction,
  useRef,
  useEffect,
} from "react";
import { Minus, Plus } from "../Icons";

interface QuantityControlProps {
  quantity: number;
  setQuantity: Dispatch<SetStateAction<number>>;
  buttonsClassName?: string;
  inputClassName?: string;
  isRounded?: boolean;
  iconClassName?: string;
}

const QuantityControl: React.FunctionComponent<QuantityControlProps> = ({
  quantity,
  setQuantity,
  buttonsClassName,
  isRounded,
  iconClassName,
}) => {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(parseInt(e.target.value));
  };
  useEffect(() => {
    return () => stopInterval();
  }, []);
  function handleIncrease() {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      setQuantity((prevQuantity) => prevQuantity + 1);
    }, 100);
  }

  function handleDecrease() {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      setQuantity((prevQuantity) =>
        prevQuantity === 1 ? 1 : prevQuantity - 1
      );
    }, 100);
  }

  const stopInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };
  function handleContextMenu(e: React.MouseEvent) {
    e.preventDefault();
  }

  return (
    <div className="flex h-full flex-col gap-4 ">
      <div
        className={`w-fit h-full overflow-hidden  ring-gray-300 ring-2 ${
          isRounded === true ? "rounded-full" : ""
        }`}
      >
        <div className="flex h-full items-center ">
          <button
            className={`w-7 h-full leading-10 flex justify-center items-center ${buttonsClassName} `}
            onMouseDown={handleDecrease}
            onMouseUp={stopInterval}
            onMouseLeave={stopInterval}
            onTouchStart={handleDecrease}
            onTouchEnd={stopInterval}
            onContextMenu={handleContextMenu}
          >
            <div className="w-[40%] h-[40%]">
              <Minus
                className={`${
                  iconClassName !== undefined ? iconClassName : "stroke-black"
                }`}
              />
            </div>
          </button>
          <input
            type="number"
            id="Quantity"
            value={quantity}
            min={0}
            onChange={handleChange}
            className={`h-full w-10 border-transparent text-center [-moz-appearance:_textfield] md:text-base text-[0.8] [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none`}
          />
          <button
            className={`w-7 h-full leading-10  flex justify-center items-center ${buttonsClassName} `}
            onMouseDown={handleIncrease}
            onMouseUp={stopInterval}
            onMouseLeave={stopInterval}
            onTouchStart={handleIncrease}
            onTouchEnd={stopInterval}
            onContextMenu={handleContextMenu}
          >
            <div className="w-[40%] h-[40%]">
              <Plus
                className={`${
                  iconClassName !== undefined ? iconClassName : "stroke-black"
                }`}
              />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuantityControl;
