import { ItemCreator } from "@/types/ItemCreator";

//Note: _G stands for _Generics

interface ItemChooserOptions<Data_G> {
  data: Data_G;
  itemNumber: string | number;
}

type Generator = <Data_G, Items_G>(
  args: Iterable<ItemCreator<Data_G, Items_G>>
) => ItemChooser<Data_G, Items_G>;

type ItemChooser<Data_G, Items_G> = ({
  data,
  itemNumber,
}: ItemChooserOptions<Data_G>) => Items_G;

export const generateItemsChooser: Generator = <Data_G, Items_G>([...args]) => {
  const items: ItemCreator<Data_G, Items_G>[] = args;

  return ({ data, itemNumber }: ItemChooserOptions<Data_G>) => {
    const indexValidation =
      typeof itemNumber === "string" ? Number(itemNumber) : itemNumber;
    let index = indexValidation - 1;
    let item: ItemCreator<Data_G, Items_G>;

    if (items[index] !== undefined) {
      item = items[index];
    } else {
      item = items[0];
    }

    return item(data);
  };
};
