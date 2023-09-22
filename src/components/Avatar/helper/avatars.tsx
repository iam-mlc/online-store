import { ListItems } from "@/types/ListItem";
import Avatar from "../Avatar";
import { generateItemsChooser } from "@/utils/generateComponents";
import { Products } from "@/types/Product";
import { ItemCreator } from "@/types/ItemCreator";
import { Categories } from "@/types/Categories";

type AvatarCreator = ItemCreator<Products | Categories<Products>, ListItems>;

const avatar_1: AvatarCreator = (data) =>
  data.map((item, index) => {
    return {
      label: item.title + index,
      component: (
        <Avatar img={item.thumbnail} text={item.title} dimensions={60} />
      ),
    };
  });
const avatar_2: AvatarCreator = (data) =>
  data.map((item, index) => {
    return {
      label: item.title + index,
      component: (
        <Avatar
          img={item.thumbnail}
          text={item.title}
          dimensions={45}
          hasOutline={true}
        />
      ),
    };
  });

const components = [avatar_1, avatar_2];

export const avatarsCreator = generateItemsChooser(components);
