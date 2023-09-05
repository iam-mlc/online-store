import { ConfigItems } from "./ConfigItems";
import { ListItems } from "./ListItem";

export type TableContent = {
  head: ListItems;
  body: ConfigItems;
  footer?: ListItems;
};
