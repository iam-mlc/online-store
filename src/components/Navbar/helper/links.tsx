import NextImage from "next/image";
import NavLink from "../NavLink";
import { generateItemsChooser } from "@/utils/generateComponents";
import { withLoadingSpinner } from "@/components/hocs/withLoadingSpinner";
import { Product, Products } from "@/types/Product";
import { ListItems } from "@/types/ListItem";
import { ItemCreator } from "@/types/ItemCreator";

// function generateLinksByCategory(
//   categoryNames: string[],
//   category: Record<string, any>
// ): Record<string, any> {
//   const linksGroupedByCategory: Record<string, any> = {};
//   for (let i = 0; i < categoryNames.length; i++) {
//     const categoryName = categoryNames[i];
//     const categoryItems = category[categoryName].items;
//     const groupOfLinks = new Array(categoryItems.length);
//     for (let j = 0; j < categoryItems.length; j++) {
//       const categoryItem = categoryItems[j];
//       groupOfLinks[j] = {
//         label: categoryItem.title,
//         thumbnail: categoryItem.thumbnail,
//         component: (
//           <NavLink
//           href="/" //
//           className="flex flex-row p-2 items-center justify-between hover:ghost"
//           >
//             <div className="">
//               <span className="">{categoryItem.title} </span>
//             </div>
//             <div className="mr-7">
//               <Image width={50} height={50} alt="" src={categoryItem.thumbnail} className="h-[60px] w-[60px] object-cover rounded-full" />
//             </div>
//           </NavLink>
//         ),
//       };
//     }
//     linksGroupedByCategory[categoryName] = groupOfLinks;
//   }
//   return linksGroupedByCategory;
// }

const Image = withLoadingSpinner(NextImage);

// function generateLinksByCategory(
//   categoryNames: string[],
//   category: Record<string, any>
// ): Record<string, any> {
//   let linksGroupedByCategory = { ...category };

//   for (let i = 0; i < categoryNames.length; i++) {
//     const categoryName = categoryNames[i];
//     const categoryItems = category[categoryName].items;
//     const groupOfLinks = new Array(categoryItems.length);
//     for (let j = 0; j < categoryItems.length; j++) {
//       const categoryItem = categoryItems[j];
//       groupOfLinks[j] = {
//         label: categoryItem.title,
//         thumbnail: categoryItem.thumbnail,
//         component: (
//           <NavLink
//             href={"/"} // `/${category[categoryName].pathName}/${categoryItem.id}`
//             className="flex flex-row p-2 items-center justify-between hover:ghost"
//           >
//             <div className="">
//               <span className="">{categoryItem.title} </span>
//             </div>
//             <div className="mr-7">
//               <Image
//                 width={50}
//                 height={50}
//                 alt=""
//                 src={categoryItem.thumbnail}
//                 className="h-[60px] w-[60px] object-cover rounded-full"
//               />
//             </div>
//           </NavLink>
//         ),
//       };
//     }
//     linksGroupedByCategory[categoryName].items = groupOfLinks;
//   }
//   return linksGroupedByCategory;
// }

const link_1: ItemCreator<Products, ListItems> = (data) =>
  data.map((item) => {
    return {
      label: item.title,
      component: (
        <>
          <NavLink
            href={`/products/${item.id}`} // `/products/${item.id}`
            className="flex flex-row p-2 items-center justify-between hover:ghost"
          >
            <div className="">
              <span className="">{item.title} </span>
            </div>
            <div className="mr-7">
              <Image
                width={50}
                height={50}
                alt=""
                src={item.thumbnail}
                className="h-[3em] w-[3em] object-cover rounded-full"
              />
            </div>
          </NavLink>
        </>
      ),
    };
  });

const components = [link_1];

export const productLinks = generateItemsChooser(components);

// export default generateLinksByCategory;
