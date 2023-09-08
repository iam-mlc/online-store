import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import NavLink from "./NavLink";
import Hamburger from "hamburger-react";
import NavList from "./NavList";
import groupByCategory, { organizeData } from "@/utils/groupByCategory";
import { productLinks } from "./helper/links";
import {
  useState,
  useEffect,
  memo,
  useMemo,
  useContext,
  useRef,
  useCallback,
} from "react";
import DropdownMenuContent from "./DropdownMenuContent";
import NavBackButton from "./NavBackButton";
import { useMeasure, useWindowSize } from "react-use";
import {
  ArrowRight,
  CaretDown,
  CaretRight,
  Delete,
  RemoveFromShoppingBag,
  ShoppingBag as ShoppingBagIcon,
  Spinner,
} from "@/components/Icons";
import { CartContext } from "@/contexts/CartContext/cartContext";
import Image from "next/image";
import UnorderedList from "../UnorderedList/UnorderedList";
import { useAttributeObserver } from "@/hooks/useAttributeObserver";
import { useDataStateObserver } from "./hooks/useDataStateObserver";
import { manageBodyScroll } from "./helper/manageBodyScroll";
import Link from "next/link";
import { QueryResponse } from "@/types/QueryResponse";
import { ProductID, ProductInCart, Products } from "@/types/Product";
import { useFetchAndQuery } from "@/hooks/useFetchAndQuery";
import {
  CartContextValues,
  addToCartOptions,
} from "@/contexts/CartContext/CartProvider";
import LocaleContext from "@/contexts/LocaleContext/LocaleContext";
import { withScaleEffect } from "../hocs/withScaleEffect";
import { useFetchProducts } from "@/hooks/useFetchProducts";
import { Category } from "@/types/Categories";

interface NavbarProps {
  // cart: Record<string, any>[];
  // query: QueryResponse;
}

interface HamburgerMenuProps {
  handleNavTabsGenerator: (dataState?: string) => {
    label: string;
    component: JSX.Element;
  }[];
  value: string;
  handleValueChange: (value: string) => void;
}
interface DropdownMenuProps {
  // query: QueryResponse;
  handleValueChange: (value: string) => void;
  receivesDataState?: string;
  navbarHeight: number;
  children?: React.ReactNode;
}
interface CartProps {
  navbarHeight?: number;
}

const NavTrigger = withScaleEffect(NavigationMenu.Trigger);

// Define a React functional component called Navbar that takes in NavbarProps as props
const Navbar: React.FunctionComponent<NavbarProps> = memo(({}) => {
  // This value state was created to give a back functionality when interacting with the Dropdown Menu(DropdownMenu Component)
  const [value, setValue] = useState("");
  const [navbarValue, setNavbarValue] = useState("");
  const { width: windowWidth, height: windowHeight } = useWindowSize();
  const [previousWidth, setPreviousWidth] = useState(windowWidth);
  const navRef = useRef<HTMLElement>(null);
  const navDropdownRef = useRef<HTMLDivElement>(null);
  const dropdownDataState = useDataStateObserver(navDropdownRef);
  const [navHeight, setNavHeight] = useState(0);

  const breakpoints = {
    lg: 1024,
    md: 768,
    sm: 480,
    xsm: 360,
  };

  useEffect(() => {
    const { lg } = breakpoints;

    // If the windowWidth has crossed the 1024 threshold, update the state
    if (
      (previousWidth < lg && windowWidth >= lg) ||
      (previousWidth >= lg && windowWidth < lg)
    ) {
      if (windowWidth >= lg) {
        setNavbarValue("");
        // setHamburgerMenuIsOpen(false);
      } else {
        setNavbarValue("");
        // setHamburgerMenuIsOpen(false);
      }
    }

    // Update the previous width
    setPreviousWidth(windowWidth);
  }, [windowWidth]);

  useEffect(() => {
    if (navRef.current) {
      setNavHeight(navRef.current.getBoundingClientRect().height);
    }
  }, []);

  // Define a function that will change the value of the NavigationMenu.Sub value
  const changeValue = useCallback((newValue: string) => {
    setValue(newValue);
  }, []);

  // Define the navigation tabs
  const navTabsGenerator = useCallback(
    (dataState?: string) => [
      {
        label: "Home",
        component: (
          <NavLink
            href="/"
            className="w-full hidden lg:inline-block lg:p-2 md:p-3 sm:p-3 text-2xl font-bold"
          >
            LOGO
          </NavLink>
        ),
      },
      {
        label: "Location",
        component: (
          <NavLink
            href="/"
            className="w-full inline-block lg:p-2 md:p-3 sm:p-3"
          >
            Location
          </NavLink>
        ),
      },
      {
        label: "About us",
        component: (
          <NavLink
            href="/about-us"
            className="w-full inline-block lg:p-2 md:p-3 sm:p-3"
          >
            About us
          </NavLink>
        ),
      },
      {
        label: "Products",
        component: (
          <DropdownMenu
            handleValueChange={changeValue}
            receivesDataState={dataState || undefined}
            // query={query}
            navbarHeight={navHeight}
          >
            Products
          </DropdownMenu>
        ),
      },
    ],
    []
  );

  const navTabs = navTabsGenerator();

  // Define the navigation items
  const items = [
    {
      label: "Navigation Menu",
      component: (
        <>
          <NavList
            items={navTabs}
            itemClassName="hover:ghost flex items-center"
            listClassName="lg:flex gap-4 hidden"
            valueName="navMenu"
          />

          <HamburgerMenu
            handleNavTabsGenerator={navTabsGenerator}
            value={value}
            handleValueChange={changeValue}
          />
        </>
      ),
    },
    {
      label: "LOGO",
      component: (
        <NavLink
          href="/"
          className="font-bold lg:hidden lg:p-2 md:p-3 sm:p-3 text-2xl"
        >
          LOGO
        </NavLink>
      ),
    },
    {
      label: "Cart",
      component: <Cart />,
    },
  ];

  return (
    <>
      <NavigationMenu.Root
        orientation="horizontal"
        className="z-50 shadow-md relative w-full bg-white/[.50] backdrop-blur-md "
        onValueChange={(value) => {
          setNavbarValue(value);
        }}
        value={navbarValue}
        ref={navRef}
      >
        {/* Navbar(Hamburger, Logo and cart) */}
        <NavList
          items={items}
          listClassName="flex justify-between items-center p-2"
          itemClassName="mx-4 flex items-center empty:hidden"
          valueName="nav-bar"
        />

        <NavigationMenu.Viewport
          forceMount
          className={`lg:absolute md:fixed sm:fixed h-[100vh] lg:w-[50vw] md:w-[100vw] sm:w-[100vw] bg-white transform translate-x-[-200%] data-[state=open]:translate-x-0 duration-500 shadow-lg pb-[${navHeight}px] z-10`}
          ref={navDropdownRef}
        />
      </NavigationMenu.Root>
      {dropdownDataState === "open" && (
        <div className="absolute w-screen h-screen bg-black/[.50] backdrop-blur-md"></div>
      )}
    </>
  );
});

const HamburgerMenu: React.FC<HamburgerMenuProps> = memo(
  ({ handleNavTabsGenerator, value, handleValueChange }) => {
    const hamburgerMenuRef = useRef<HTMLButtonElement>(null);
    const dataState = useDataStateObserver(hamburgerMenuRef);
    const navTabs = useMemo(
      () => handleNavTabsGenerator(dataState),
      [dataState]
    );

    useEffect(() => {
      manageBodyScroll(dataState === "open" ? true : false);
    }, [dataState]);

    useEffect(() => {
      if (dataState === "closed") {
        handleValueChange("");
      }
    }, [dataState]);

    return (
      <>
        <NavigationMenu.Trigger
          onPointerMove={(event) => event.preventDefault()}
          onPointerLeave={(event) => event.preventDefault()}
          onClick={(event) => event.stopPropagation()}
          className="hover:ghost active:ghost sm:block lg:hidden"
          ref={hamburgerMenuRef}
        >
          <Hamburger
            rounded
            color="#162d13ff"
            size={20}
            toggled={dataState === "open"}
            // toggle={handleMenuToggle}
            label="Show menu"
          />
        </NavigationMenu.Trigger>
        {
          <NavigationMenu.Content
            onPointerMove={(event) => event.preventDefault()}
            onPointerLeave={(event) => event.preventDefault()}
            className="h-[100%] sm:block lg:hidden"
          >
            {/* Dropdown content */}
            <NavigationMenu.Sub
              value={value}
              className=""
              onValueChange={handleValueChange}
            >
              <NavList
                items={navTabs}
                itemClassName=""
                listClassName="flex lg:flex-col lg:gap-4 md:flex-col md:p-4 sm:flex-col divide-y-[1px] divide-black/10"
                valueName="hamburgerMenu"
              />

              <NavigationMenu.Viewport
                forceMount
                className={`fixed top-0 left-0 h-[100vh] w-[100vw] bg-white transform md:translate-x-[-100%] sm:translate-x-[-100%]  md:data-[state=open]:translate-x-0 sm:data-[state=open]:translate-x-0 duration-500 `}
              />
            </NavigationMenu.Sub>
          </NavigationMenu.Content>
        }
      </>
    );
  }
);

const DropdownMenu: React.FC<DropdownMenuProps> = memo(
  ({ receivesDataState, handleValueChange, navbarHeight, children }) => {
    const url = "https://dummyjson.com/products";
    const { products, isLoading, categories, getCategory } =
      useFetchProducts(url);
    const dropdownMenuRef = useRef<HTMLButtonElement>(null);
    const dataState = useDataStateObserver(dropdownMenuRef);

    useEffect(() => {
      manageBodyScroll(dataState === "open" ? true : false);
    }, [dataState]);

    return (
      <>
        <NavigationMenu.Trigger
          className="flex justify-between w-full items-center lg:p-2 md:p-3 sm:p-3 group data-[state=open]:ghost"
          onPointerMove={(event) => {
            event.preventDefault();
          }}
          onPointerLeave={(event) => {
            event.preventDefault();
          }}
          onClick={(event) => event.stopPropagation()}
          ref={dropdownMenuRef}
        >
          <DropdownTitle>{children}</DropdownTitle>
        </NavigationMenu.Trigger>

        <NavigationMenu.Content
          className={`h-[100%]`}
          onPointerEnter={(event) => event.preventDefault()}
          onPointerLeave={(event) => event.preventDefault()}
          data-orientation="vertical"
        >
          {/* Button to Close Dropdown  */}
          <NavBackButton changeValue={handleValueChange} />
          {isLoading || products.length === 0 ? (
            <div className="relative w-full h-full flex justify-center items-center ">
              <Spinner className="w-[30%] h-[30%]" />
              <div className="absolute w-full h-full bg-black/[.30] -z-10 animate-pulse"></div>
            </div>
          ) : (
            <>
              <DropdownMenuContent
                data={categories.filter(
                  (category: Category<Products>) =>
                    category.title !== "All products"
                )}
                className=""
                orientation="vertical"
                receivesDataState={receivesDataState || dataState}
                navbarHeight={navbarHeight}
              />
              <SeeAllProductsLink />
            </>
          )}
        </NavigationMenu.Content>
      </>
    );
  }
);

const SeeAllProductsLink: React.FC = () => {
  return (
    <div>
      <NavLink
        href={`/products`}
        className="border-y-[1px] border-black/[.30] block"
      >
        <div className="flex justify-between p-4 align-middle w-full hover:ghost">
          <span className="font-bold">See All Products</span>
          <div className="my-auto">
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </NavLink>
    </div>
  );
};

interface DropdownTitle {
  children: React.ReactNode;
}

const DropdownTitle: React.FC<DropdownTitle> = ({ children }) => {
  return (
    <>
      <span>{children}</span>
      <div className="my-auto">
        <div
          className={`group-data-[state=open]:rotate-180 transition-all duration-500`}
        >
          <CaretDown
            className={`w-4 h-4 lg:block md:hidden sm:hidden opacity-70`}
          />
          <CaretRight
            className={`w-5 h-5 opacity-70 lg:hidden md:block sm:block`}
          />
        </div>
      </div>
    </>
  );
};

// Note: memo() is being used in the Cart component because when there is a state change in the Cart component, the Navbar component re-renders
const Cart: React.FC<CartProps> = memo(({ navbarHeight }) => {
  const { cartData, addToCart, removeFromCart } = useContext(
    CartContext
  ) as CartContextValues;
  const cartRef = useRef<HTMLButtonElement>(null);
  const dataState = useDataStateObserver(cartRef);

  useEffect(() => {
    manageBodyScroll(dataState === "open" ? true : false);
  }, [dataState]);

  const items = useMemo(() => {
    return cartData.products.map((item) => {
      return {
        label: item.title,
        component: (
          <CartItem
            product={item}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
          />
        ),
      };
    });
  }, [cartData.products]);

  return (
    <>
      <NavigationMenu.Trigger
        className="hover:ghost active:ghost data-[state=open]:ghost"
        onPointerMove={(event) => event.preventDefault()}
        onPointerLeave={(event) => event.preventDefault()}
        ref={cartRef}
      >
        <ShoppingBag />
      </NavigationMenu.Trigger>
      <NavigationMenu.Content
        onPointerEnter={(event) => event.preventDefault()}
        onPointerLeave={(event) => event.preventDefault()}
        className={`h-full overflow-y-scroll pb-[100px] relative `}
      >
        <NavLink
          href={"/cart"}
          className="w-full bg-black/[.50] text-white block text-center font-bold p-4 fixed backdrop-blur-xl z-10"
        >
          <span>Go to Cart</span>
        </NavLink>
        <UnorderedList
          items={items}
          listClassName="flex flex-col overflow-x-hidden divide-y-2 divide-black/[.20] p-6 mt-16"
          itemClassName="p-2"
        />
      </NavigationMenu.Content>
    </>
  );
});

interface CartItem {
  product: ProductInCart;
  addToCart: ({ itemID, quantity }: addToCartOptions) => void;
  removeFromCart: (itemID: ProductID) => void;
}

const CartItem: React.FC<CartItem> = ({ product }) => {
  const { numberToCurrency } = useContext(LocaleContext);
  const { addToCart, removeFromCart } = useContext(
    CartContext
  ) as CartContextValues;
  return (
    <div className="flex flex-col md:flex-row p-2 gap-8 items-center">
      <div className="md:w-[10em] md:h-[6em] w-[8em] h-[8em] rounded-full overflow-hidden  ">
        <Image
          src={product.thumbnail}
          alt={product.title}
          width={100}
          height={100}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="flex flex-col gap-5 w-full items-center md:items-start">
        <div className="flex flex-col gap-2 items-center md:items-start">
          <div className="font-bold text-lg min-w-[8ch] truncate">
            {product.title}
          </div>
          <div className="flex flex-col md:flex-row md:gap-8 items-center md:items-start">
            <div className=" flex items-end gap-2 ">
              <span className="text-black/[.50]">Price:</span>
              <span className="flex items-end font-semibold">
                {numberToCurrency(product.price)}
              </span>
            </div>
            <div className=" flex items-end gap-2 ">
              <span className="text-black/[.50]">Quantity:</span>
              <span className="font-semibold">{product.quantity}</span>
            </div>
          </div>
        </div>
        <div>
          <button
            onClick={() => removeFromCart(`${product.id}`)}
            className="flex gap-2 items-center"
          >
            <Delete className="md:w-5 md:h-5 w-4 h-4" />
            <span>Remove</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const ShoppingBag: React.FC = () => {
  const { cartData } = useContext(CartContext) as CartContextValues;
  return (
    <div className="relative">
      <ShoppingBagIcon className="w-8 h-8 opacity-70" />
      <div className="absolute top-0 -right-1 h-fit w-fit">
        <span className="text-white text-xs font-bold inline-block bg-red-500 rounded-full px-[0.4em] py-0">
          {cartData.totalItems}
        </span>
      </div>
    </div>
  );
};

export default Navbar;
