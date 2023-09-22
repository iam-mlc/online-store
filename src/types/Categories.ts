export type Category<Item_G> = {
  thumbnail: ImageURL;
  items: Item_G;
  title: CategoryTitle;
  totalItems: TotalItemsInCategory;
  pathName: CategoryRoute;
};

export type Categories<Item_G> = Category<Item_G>[];

type CategoryTitle = string;
type TotalItemsInCategory = number;
type CategoryRoute = string;
