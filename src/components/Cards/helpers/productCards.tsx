import ProductCard1 from "../ProductCards/ProductCard1";
import ProductCard2 from "../ProductCards/ProductCard2";
import ProductCard3 from "../ProductCards/ProductCard3";
import { generateItemsChooser } from "@/utils/generateComponents";
import { ListItem, ListItems } from "@/types/ListItem";
import { Product, Products } from "@/types/Product";
import { ItemCreator } from "@/types/ItemCreator";
import { ProductCardProps } from "@/types/ProductCard";
import { createCardListItems } from "@/utils/createItems";

type CardCreator = ItemCreator<
  Partial<Product> | Partial<Product>[],
  ListItem | ListItems
>;

const card_1: CardCreator = (data) => {
  return createCardListItems({
    data,
    Component: ProductCard1,
  });
};
const card_2: CardCreator = (data) =>
  createCardListItems({
    data,
    Component: ProductCard2,
  });
const card_3: CardCreator = (data) =>
  createCardListItems({
    data,
    Component: ProductCard3,
  });

const components = [card_1, card_2, card_3];

export const productCards = generateItemsChooser(components);
