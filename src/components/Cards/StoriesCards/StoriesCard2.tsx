// import * as React from "react";
import { useContext } from "react";
import Button from "../../Button";
import LocaleContext from "@/contexts/LocaleContext/LocaleContext";

interface StoriesCard2Props {
  title: string;
  description: string;
  image: string;
  price: number;
}

const StoriesCard2: React.FC<StoriesCard2Props> = ({
  title,
  description,
  image,
  price,
}) => {
  const { numberToCurrency } = useContext(LocaleContext);
  return (
    <div className="lg:w-[30%] md:w-[30%] sm:w-full">
      <div className="relative block group ">
        <img
          src={`https://images.unsplash.com/photo-1593795899768-947c4929449d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2672&q=80`}
          alt=""
          className="h-[350px] w-full object-cover transition duration-500 group-hover:opacity-90 sm:h-[450px]"
          loading="lazy"
        />
        <div className="absolute top-0 flex flex-col items-start justify-end p-6 bg-black w-full h-full opacity-50"></div>
        <div className="absolute top-0 flex flex-col items-start justify-end p-6">
          <div className="flex flex-col gap-4 items-start justify-end ">
            <h3 className="text-xl font-medium text-white">{title}</h3>
            <p className="mt-1.5 max-w-[40ch] text-xs text-white">
              {description}
            </p>
            <h4 className="text-3xl font-medium text-white">
              {numberToCurrency(price)}
            </h4>
            {/* <Button asLink href="#">
              Saber Mais
            </Button> */}
          </div>
        </div>
      </div>
      {/* <div className="w-full  bg-slate-300  text-center font-bold">
            <a href="" className="inline-block w-full p-6">Saber Mais</a>
          </div> */}
    </div>
  );
};

export default StoriesCard2;
