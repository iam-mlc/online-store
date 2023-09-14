// import * as React from "react";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import ProductContext from "@/contexts/ProductsContext/ProductsContext";
import ProductStories from "./ProductStories/ProductStories";
import { useFetchAndQuery } from "@/hooks/useFetchAndQuery";
import { QueryResponse } from "@/types/QueryResponse";
import Image from "next/image";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FunctionComponent<LayoutProps> = ({ children }) => {

  const url = "https://dummyjson.com/products";
  const productsQuery = useFetchAndQuery(url) as QueryResponse;

  return (
    <div>
      <div className="relative py-[5em]">
        <header className="fixed top-0 w-full z-[999] " /* ref={headerRef} */>
          <Navbar></Navbar>
        </header>
        <div className="">
          <div className="">
            <ProductStories query={productsQuery} />
          </div>
          {children}
        </div>
      
        {/* <div className="absolute w-full h-full top-0 right-0 -z-10 ">
          <Image
            width={2000}
            height={2000}
            alt="style"
            src={`/images/homePage/design/7.jpg`}
            className="object-cover w-full h-full"
          />
          <div className="absolute bg-black/[.70] w-full h-full top-0 left-0 backdrop-blur-md"></div>
        </div> */}
      </div>
        <Footer />
    </div>
  );
};

export default Layout;
