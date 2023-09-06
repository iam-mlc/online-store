import ProductContext from "./ProductsContext";
import { useFetchAndQuery } from "@/hooks/useFetchAndQuery";

const ProductsProvider = ({ children }: any) => {
    const url = "https://dummyjson.com/products";
    const productQuery= useFetchAndQuery(url);

    const urlGroup = {
        allProducts: "https://dummyjson.com/products",
        categoryNames: "https://dummyjson.com/products/categories",
    }

    return(
        <ProductContext.Provider value={productQuery}>
            {children}
        </ProductContext.Provider>
    )
}

export default ProductsProvider