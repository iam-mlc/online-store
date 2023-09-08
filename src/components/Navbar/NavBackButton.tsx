// import * as React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { ArrowLeft } from "../Icons";


interface NavBackButtonProps {
  changeValue: (newValue: string) => void;
}

const NavBackButton: React.FunctionComponent<NavBackButtonProps> = ({
  changeValue,
}) => {
  const handleClick = (event: any) => {
    event.stopPropagation();
    changeValue("");
  };
  return (
    <button
      onClick={handleClick}
      className="lg:hidden md:flex sm:flex flex-row-reverse justify-between w-[100%] p-4 align-middle font-bold border-b-[1px] border-black/[.30]"
    >
      <span>Back</span>
      <div className="w-5 h-5">
        <ArrowLeft className="w-5 h-5" />
      </div>
    </button>
  );
};

export default NavBackButton;
