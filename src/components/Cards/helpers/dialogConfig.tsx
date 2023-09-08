import { Cart } from "@/components/Icons";
import { ItemCreator } from "@/types/ItemCreator";
import { ListItem } from "@/types/ListItem";
import { Product, Products } from "@/types/Product";
import { TriggerAndContent } from "@/types/TriggerAndContent";
import ProductCard2 from "../ProductCards/ProductCard2";
import { generateItemsChooser } from "@/utils/generateComponents";
import { ConfigItem, ConfigItems } from "@/types/ConfigItems";
import { createCardListItems, createDialogConfig } from "@/utils/createItems";
import { ProductCardProps } from "@/types/ProductCard";

type DialogCreator = ItemCreator<
  Partial<Product> | Products,
  ConfigItem | ConfigItems
>;

const cartTrigger = (
  <div className="md:w-5 md:h-5 w-6 h-6 m-auto ">
    <Cart className="fill-white" />
  </div>
);

const dialog_1: DialogCreator = (data) => {
  return createDialogConfig({
    data: data,
    Content: ProductCard2,
    Trigger: cartTrigger,
  });
};

const components = [dialog_1];

export const dialogConfig = generateItemsChooser(components);
