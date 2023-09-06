import {
  Fragment,
  createContext,
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { CartContext } from "./cartContext";
import ProductContext from "../ProductsContext/ProductsContext";
import {
  Cart,
  Product,
  ProductID,
  ProductInCart,
  ProductQuantity,
  Products,
  ProductsInCart,
} from "@/types/Product";
import { QueryResponse } from "@/types/QueryResponse";
import Toast from "@/components/Toast/Toast";
import LocaleContext from "../LocaleContext/LocaleContext";
import { addDecimals } from "@/utils/formatNumber";

interface CartProviderProps {
  children: React.ReactNode;
}

export interface addToCartOptions {
  itemID: ProductID;
  quantity: ProductQuantity;
}
interface manageItemsParams<Items_G> {
  itemID: ProductID;
  searchItems: Items_G;
}
interface addItemParams extends manageItemsParams<ProductsInCart> {
  itemsToExtractData: Products;
  itemUnits?: ProductQuantity;
}

type Action =
  | { type: "ADD"; id: ProductID; units: ProductQuantity }
  | { type: "REMOVE"; id: ProductID }
  | { type: "RESET" }
  | { type: "LOAD"; data: Cart };

export interface CartContextValues {
  cartData: Cart;
  addToCart: ({ itemID, quantity }: addToCartOptions) => void;
  removeFromCart: (id: ProductID) => void;
  resetCart: () => void;
}

// const CURRENCY = "MZN";

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const { CURRENCY_SYMBOL } = useContext(LocaleContext);
  const initialCartData: Cart = {
    subTotal: {
      withDiscount: addDecimals(0),
      withoutDiscount: addDecimals(0),
    },
    currency: CURRENCY_SYMBOL,
    products: [],
    totalItems: 0,
  };

  const [products, setProducts] = useState<Products>([]);
  const [toastIsOpen, setToastIsOpen] = useState(false);
  const [toastContent, setToastContent] = useState({
    title: "",
    textColor: "",
    bgColor: "",
  });
  const timerRef = useRef(0);

  const productsQuery = useContext(ProductContext) as QueryResponse;

  useEffect(() => {
    if (productsQuery.data !== undefined) {
      setProducts(productsQuery.data.products);
    }
  }, [productsQuery.data]);

  useEffect(() => {
    const cartData = sessionStorage.getItem("cart");
    if (cartData) {
      const cartItems = JSON.parse(cartData);
      loadCart(cartItems);
    }
    return () => clearTimeout(timerRef.current);
  }, []);

  const [cartData, dispatch] = useReducer(cartReducer, initialCartData);

  function handleToast() {
    clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      setToastIsOpen(true);
    }, 100);
  }

  function cartReducer(cartData: Cart, action: Action) {
    const sessionStorageKey = "cart";

    switch (action.type) {
      case "ADD": {
        const cartItems = addItem({
          itemID: action.id,
          searchItems: cartData.products,
          itemsToExtractData: products,
          itemUnits: action.units,
        });

        const totalDiscountAmount = cartItems
          .map((item) => {
            return item.subTotal.withDiscount;
          })
          .reduce((total, currentValue) => total + currentValue, 0);

        const totalAmount = cartItems
          .map((item) => {
            return item.subTotal.withoutDiscount;
          })
          .reduce((total, currentValue) => total + currentValue, 0);

        const newCartData = {
          subTotal: {
            withDiscount: addDecimals(totalDiscountAmount),
            withoutDiscount: addDecimals(totalAmount),
          },
          currency: CURRENCY_SYMBOL,
          products: cartItems,
          totalItems: cartItems.length,
        };

        const item = findItem({
          itemID: action.id,
          searchItems: products,
        });
        if (item) {
          setToastContent({
            title: `${item.title || "Product"} was added to cart ✅`,
            textColor: "text-green-500",
            bgColor: "bg-green-200/[.60]",
          });
        } else {
          setToastContent({
            title: `Product was added to cart ✅`,
            textColor: "text-green-500",
            bgColor: "bg-green-200/[.60]",
          });
        }
        handleToast();
        addToSessionStorage({
          key: sessionStorageKey,
          data: newCartData,
        });

        return newCartData;
      }
      case "REMOVE": {
        const item = findItem({
          itemID: action.id,
          searchItems: cartData.products,
        });
        
        if (item) {
          setToastContent({
            title: `${item.title} was removed from cart ❌`,
            textColor: "text-red-500",
            bgColor: "bg-red-200/[.60]",
          });
        } else {
          setToastContent({
            title: `Item does not exist in cart ❌`,
            textColor: "text-red-500",
            bgColor: "bg-red-200/[.60]",
          });
        }
        handleToast();
        const cartItems = removeItem({
          itemID: action.id,
          searchItems: cartData.products,
        });

        const totalDiscountAmount = cartItems
          .map((item) => {
            return item.subTotal.withDiscount;
          })
          .reduce((total, currentValue) => total + currentValue, 0);

        const totalAmount = cartItems
          .map((item) => {
            return item.subTotal.withoutDiscount;
          })
          .reduce((total, currentValue) => total + currentValue, 0);

        const newCartData = {
          subTotal: {
            withDiscount: totalDiscountAmount,
            withoutDiscount: totalAmount,
          },
          currency: CURRENCY_SYMBOL,
          products: cartItems,
          totalItems: cartItems.length,
        };

        addToSessionStorage({
          key: sessionStorageKey,
          data: newCartData,
        });

        return newCartData;
      }
      case "RESET": {
        const cart = initialCartData;
        setToastContent({
          title: `Your cart has been emptied 👍`,
          textColor: "text-green-500",
          bgColor: "bg-green-200/[.60]",
        });
        handleToast();
        addToSessionStorage({
          key: sessionStorageKey,
          data: cart,
        });
        return cart;
      }
      case "LOAD":
        return action.data;
      default:
        throw new Error("No case for that type");
    }
  }

  const addToCart = ({ itemID, quantity }: addToCartOptions) => {
    dispatch({
      type: "ADD",
      id: itemID,
      units: quantity,
    });
  };

  const removeFromCart = (id: ProductID) => {
    dispatch({
      type: "REMOVE",
      id: id,
    });
  };

  const resetCart = () => {
    dispatch({
      type: "RESET",
    });
  };
  const loadCart = (data: Cart) => {
    dispatch({
      type: "LOAD",
      data: data,
    });
  };

  const values: CartContextValues = {
    cartData,
    addToCart,
    removeFromCart,
    resetCart,
  };

  return (
    <CartContext.Provider value={values}>
      {children}

      <Toast
        open={toastIsOpen}
        onOpenChange={setToastIsOpen}
        // duration={3000}
        title={toastContent.title}
        altText="Go to cart"
        className="px-4 py-2 flex"
        titleClassName={`text-lg font-bold ${toastContent.textColor}`}
        contentClassName=""
        viewportClassName={`fixed top-20 md:right-5 right-0 ${toastContent.bgColor} backdrop-blur-sm rounded-full z-[9999]`}
      />
    </CartContext.Provider>
  );
};

function findItem({
  itemID,
  searchItems,
}: manageItemsParams<ProductsInCart | Products>) {
  return searchItems.find((item: Product) => `${item.id}` === `${itemID}`);
}

function addItem({
  itemID,
  searchItems,
  itemsToExtractData,
  itemUnits,
}: addItemParams) {
  const alreadyExists = verifyItem({
    itemID: itemID,
    searchItems: searchItems,
  });

  const foundProduct = findItem({
    itemID: itemID,
    searchItems: itemsToExtractData,
  });

  if (foundProduct) {
    const productUnits = itemUnits || 1;
    const productPrice = foundProduct.price;
    const productDiscount =
      (foundProduct.discountPercentage / 100) * productPrice;

    const discountAmount = productPrice * productUnits - productDiscount;

    const normalAmount = productPrice * productUnits;

    let product: ProductInCart = {
      ...foundProduct,
      quantity: itemUnits || 1,
      subTotal: {
        withDiscount: addDecimals(discountAmount),
        withoutDiscount: addDecimals(normalAmount),
      },
    };

    if (alreadyExists) {
      const updatedProducts = removeItem({
        itemID: itemID,
        searchItems: searchItems,
      });

      return [...updatedProducts, product];
    }

    return [...searchItems, product];
  } else {
    return searchItems;
  }
}

function verifyItem({
  itemID,
  searchItems,
}: manageItemsParams<ProductsInCart>) {
  return searchItems.some((product: Product) => `${product.id}` === `${itemID}`);
}

function removeItem({
  itemID,
  searchItems,
}: manageItemsParams<ProductsInCart>) {
  return searchItems.filter((item: Product) => `${item.id}` !== `${itemID}`);
}
function addToSessionStorage({ key, data }: { key: string; data: Cart }) {
  const item = JSON.stringify(data);
  sessionStorage.setItem(key, item);
}
