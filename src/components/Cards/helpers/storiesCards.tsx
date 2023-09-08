import ProductCard1 from "../ProductCards/ProductCard1";
import ProductCard2 from "../ProductCards/ProductCard2";
import {
  generateItemsChooser,
} from "@/utils/generateComponents";
import StoriesCard1 from "../StoriesCards/StoriesCard1";
import { WithHeader } from "react-insta-stories";
import { WithSeeMore } from "react-insta-stories";
import SeeMore from "../StoriesCards/StoriesDetails/SeeMore";
import toName from "@/utils/toName";
import Stories from "react-insta-stories";
import { Action, Story } from "react-insta-stories/dist/interfaces";
import StoriesButton from "../StoriesCards/StoriesDetails/StoriesButton";
import StoriesContent from "../StoriesCards/StoriesDetails/StoriesContent";
import { Product, Products } from "@/types/Product";
import { ConfigItems } from "@/types/ConfigItems";
import { ItemCreator } from "@/types/ItemCreator";
import StoriesLink from "../StoriesCards/StoriesDetails/StoriesLink";


// const card_1 = (data: Products) => {
//   return data.map((item) => {
//     const storie = createStorie(item);

//     return storie;
//   });
// };

const card_2 : ItemCreator<Products, ConfigItems> = (data)  => {
  return data.map((item) => {
    const storie = createStorie(item);

    return {
      label: item.title as string,
      config: storie,
    };
  });
};

function createStorie(data: Product): Story {
  return {
    content: ({ story, config, action }) => (
      <StoriesContent
        story={story}
        action={action}
        config={config}
        data={data}
      />
    ),
    seeMoreCollapsed: ({ toggleMore, action }) => (
      // <StoriesButton toggleMore={toggleMore} action={action} />
      <StoriesLink data={data}/>
    ),
    seeMore: ({ close }: any) => <SeeMore close={close} data={{ ...data }} />,
    header: {
      heading: toName(data.category),
      subheading: "",
      profileImage: "",
    },
  };
}

const components = [card_2];

export const storiesCards = generateItemsChooser(components);
