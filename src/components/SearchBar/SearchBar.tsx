import { forwardRef, useRef, useState } from "react";
import { Dispatch, SetStateAction } from "react";
import { FaSearch } from "react-icons/fa";

interface ISearchBarProps {
    handleSearch: Dispatch<SetStateAction<string>>
    ref?: React.ForwardedRef<HTMLInputElement>;
}

const SearchBar: React.FunctionComponent<ISearchBarProps> = forwardRef(({handleSearch}, ref) => {
    const [value, setValue] = useState("");
    const searchRef = useRef<HTMLInputElement>(null);
    const handleChange = (e : React.ChangeEvent<HTMLInputElement> )=>{
        setValue(e.target.value)
        handleSearch(e.target.value)
    }

  return (
    <>
      <div className="group relative flex w-full ring-gray-200 rounded-full ring-2 focus-within:ring-black ">
        <label
          className={`absolute top-0 left-0 w-full h-full flex items-center pl-[10px] duration-200 text-sm group-focus-within:text-xs group-focus-within:h-1/2 group-focus-within:-translate-y-full group-focus-within:pl-0 ${value.length !== 0 ? "text-xs h-1/2 -translate-y-full pl-0": ""}`}
          htmlFor="label"
        >
          Search
        </label>
        <input
          id="label"
          className="rounded-xl w-full md:w-full  outline-none py-3 px-4 text-xs bg-transparent"
          type="text"
          ref={ref}
          value={value}
          onChange={handleChange}
          />
          <button>
              <FaSearch className="w-6 h-6 my-auto mr-4 text-black/[.30]"/>
          </button>
      </div>
    </>
  );
});

export default SearchBar;
