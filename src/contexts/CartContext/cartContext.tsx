import { createContext } from "react";
import { CartContextValues } from "./CartProvider";


export const CartContext = createContext<CartContextValues>({} as CartContextValues);
