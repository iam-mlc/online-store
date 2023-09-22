import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import ProductStories from "./ProductStories/ProductStories";
import { useFetchAndQuery } from "@/hooks/useFetchAndQuery";
import { QueryResponse } from "@/types/QueryResponse";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FunctionComponent<LayoutProps> = ({ children }) => {
  const url = "https://dummyjson.com/products";
  const productsQuery = useFetchAndQuery(url) as QueryResponse;

  return (
    <div>
      <div className="relative py-[5em]">
        <header className="fixed top-0 w-full z-[999] ">
          <Navbar></Navbar>
        </header>
        <div className="">
          <div className="">
            <ProductStories query={productsQuery} />
          </div>
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
