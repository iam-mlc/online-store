import {  ConfigItem, ConfigItems } from "@/types/ConfigItems";
import { ItemCreator } from "@/types/ItemCreator";
import {  ListItem, ListItems } from "@/types/ListItem";
import { TableContent } from "@/types/TableContent";

//Note: _G stands for _Generics

// type CreatedItem<Data_G,ReturnItem_G> = 
// ReturnItem_G extends ListItem ? ListItem :
// ReturnItem_G extends  ConfigItem ? ConfigItem : 
// ReturnItem_G extends TableContent ? TableContent :
// never;

type Item<Data_G, Item_G> = Data_G extends Array<any> ? Item_G[] : Item_G



interface ItemChooserOptions<Data_G> {
  data: Data_G;
  itemNumber: string | number;
}
// type Generator<Items_G> = <Data_G>(
//   args: Iterable<ItemCreator<Data_G, Items_G>>
// ) => ItemChooser<Data_G, Items_G>;

type Generator = <Data_G, Items_G>(
  args: Iterable<ItemCreator<Data_G, Items_G>>
) => ItemChooser<Data_G, Items_G>;


type ItemChooser<Data_G, Items_G> = ({
  data,
  itemNumber,
}: ItemChooserOptions<Data_G>) => Items_G;

// type ItemCreator<Data_G, Items_G> = (data: Data_G) => Items_G;

type Items = ListItem | ConfigItem | TableContent

// type ItemCreator<Data_G> = <Items_G>(data: Data_G) => Items_G;




// export const generateListItems: Generator= <Data_G>([
//   ...args
// ]) => {
//   const items: ItemCreator<Data_G, ListItem>[] = args;

//   return ({ data, itemNumber }: ItemChooserOptions<Data_G>) => {
//     const indexValidation =
//       typeof itemNumber === "string" ? Number(itemNumber) : itemNumber;
//     let index = indexValidation - 1;

//     let item: ItemCreator<Data_G, ListItem>;

//     if (items[index] !== undefined) {
//       item = items[index];
//     } else {
//       item = items[0];
//     }

//     return item(data);
//   };
// };

// export const generateConfig : Generator = <Data_G>([...args]) => {
//   const items : ItemCreator<Data_G, Items>[] = args;

//   return ({ data, itemNumber }: ItemChooserOptions<Data_G>) => {
//     const indexValidation =
//       typeof itemNumber === "string" ? Number(itemNumber) : itemNumber;
//     let index = indexValidation - 1;
//     let item: ItemCreator<Data_G, Items>

//     if (items[index] !== undefined) {
//       item = items[index];
//     } else {
//       item = items[0];
//     }

//     return item(data);
//   };
// };

// export const generateTable : Generator = <Data_G>([...args]) => {
//   const items : ItemCreator<Data_G, TableContent>[] = args;

//   return ({ data, itemNumber }: ItemChooserOptions<Data_G>) => {
//     const indexValidation =
//       typeof itemNumber === "string" ? Number(itemNumber) : itemNumber;
//     let index = indexValidation - 1;
//     let item: ItemCreator<Data_G, TableContent>

//     if (items[index] !== undefined) {
//       item = items[index];
//     } else {
//       item = items[0];
//     }

//     return item(data);
//   };
// };

export const generateItemsChooser: Generator = <Data_G, Items_G>([...args]) => {
  const items : ItemCreator<Data_G, Items_G>[] = args;

  return ({ data, itemNumber }: ItemChooserOptions<Data_G>) => {
    const indexValidation =
      typeof itemNumber === "string" ? Number(itemNumber) : itemNumber;
    let index = indexValidation - 1;
    let item: ItemCreator<Data_G, Items_G>

    if (items[index] !== undefined) {
      item = items[index];
    } else {
      item = items[0];
    }

    return item(data);
  };
};